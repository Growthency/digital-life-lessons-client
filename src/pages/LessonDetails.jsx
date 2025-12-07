import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaHeart,
  FaBookmark,
  FaFlag,
  FaShareAlt,
  FaPaperPlane,
  FaLock,
} from "react-icons/fa";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [lesson, setLesson] = useState(null);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [comments, setComments] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [isUserPremium, setIsUserPremium] = useState(false);

  const shareUrl = window.location.href; // বর্তমান পেজের লিংক

  useEffect(() => {
    // 1. Main Lesson
    axios
      .get(`http://localhost:5000/lessons/${id}`)
      .then((res) => {
        setLesson(res.data);
        setLikeCount(res.data.likes || 0);
        if (user && res.data.likedBy?.includes(user.email)) setIsLiked(true);
      })
      .catch((err) => console.error(err));

    // 2. Similar Lessons
    axios
      .get(`http://localhost:5000/lessons/similar/${id}`)
      .then((res) => setSimilarLessons(res.data))
      .catch((err) => console.log(err));

    // 3. Comments
    fetchComments();

    // 4. Counts
    axios
      .get(`http://localhost:5000/favorites/count/${id}`)
      .then((res) => setSaveCount(res.data.count));

    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setIsUserPremium(res.data.isPremium))
        .catch((err) => {});
      axiosSecure
        .get(`/favorites/${user.email}`)
        .then((res) => {
          if (res.data.find((fav) => fav.lessonId === id)) setIsSaved(true);
        })
        .catch((err) => {});
    }
  }, [id, user, axiosSecure]);

  const fetchComments = () => {
    axios
      .get(`http://localhost:5000/comments/${id}`)
      .then((res) => setComments(res.data));
  };

  const handleLike = () => {
    if (!user) return toast.error("Login to like!");
    const newStatus = !isLiked;
    setIsLiked(newStatus);
    setLikeCount((prev) => (newStatus ? prev + 1 : prev - 1));
    axiosSecure
      .patch(`/lessons/like/${id}`, { email: user.email })
      .catch(() => {});
  };

  const handleFavorite = () => {
    if (!user) return toast.error("Login to save!");
    const newStatus = !isSaved;
    setIsSaved(newStatus);
    setSaveCount((prev) => (newStatus ? prev + 1 : prev - 1));
    axiosSecure
      .post("/favorites/toggle", {
        lessonId: lesson._id,
        title: lesson.title,
        image: lesson.image,
        category: lesson.category,
        userEmail: user.email,
      })
      .then((res) =>
        toast.success(res.data.message === "added" ? "Saved!" : "Removed!")
      )
      .catch(() => {});
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login to comment");
    const text = e.target.comment.value;
    const newComment = {
      lessonId: id,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: text,
      createdAt: new Date(),
    };
    axiosSecure.post("/comments", newComment).then((res) => {
      if (res.data.insertedId) {
        e.target.reset();
        fetchComments();
        toast.success("Comment added!");
      }
    });
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const reason = e.target.reason.value;
    axiosSecure
      .post("/reports", {
        lessonId: lesson._id,
        lessonTitle: lesson.title,
        reporterEmail: user.email,
        reason: reason,
        timestamp: new Date(),
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Report submitted.");
          document.getElementById("report_modal").close();
        }
      });
  };

  if (!lesson)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  const isLocked = lesson.accessLevel === "Premium" && !isUserPremium;

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <Link to="/" className="btn btn-ghost mb-6 gap-2">
        <FaArrowLeft /> Back
      </Link>

      {/* --- MAIN CARD --- */}
      <div className="card bg-base-100 shadow-xl border overflow-hidden relative mb-12">
        <div
          className="absolute top-4 right-4 z-10 tooltip tooltip-left"
          data-tip="Report this lesson"
        >
          <button
            onClick={() =>
              user
                ? document.getElementById("report_modal").showModal()
                : toast.error("Login to report")
            }
            className="btn btn-circle btn-sm bg-white border-none shadow-md text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <FaFlag className="text-lg" />
          </button>
        </div>
        <figure className="h-[400px] w-full relative">
          <img
            src={lesson.image}
            className={`w-full h-full object-cover ${
              isLocked ? "blur-sm" : ""
            }`}
          />
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="badge badge-warning p-4 font-bold">
                <FaLock /> Premium
              </div>
            </div>
          )}
        </figure>
        <div className="card-body">
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="badge badge-primary p-3 font-semibold">
              {lesson.category}
            </div>
            <div className="badge badge-secondary badge-outline p-3 font-semibold">
              {lesson.emotionalTone}
            </div>
            {lesson.accessLevel === "Premium" && (
              <div className="badge badge-warning p-3 gap-1 font-bold">
                <FaLock size={12} /> Premium
              </div>
            )}
            {lesson.accessLevel === "Free" && (
              <div className="badge badge-success text-white p-3 gap-1 font-bold">
                <FaLock size={12} /> Free
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-lg">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={
                    lesson.author?.photo || "https://i.ibb.co/TmghV6k/user.png"
                  }
                  alt="Author"
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">{lesson.author?.name}</p>
              <p className="text-xs text-gray-500">
                Posted on: {new Date(lesson.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <div className="divider"></div>

          {isLocked ? (
            <div className="text-center py-6 bg-base-200 rounded">
              <Link to="/pricing" className="btn btn-primary">
                Upgrade to Unlock
              </Link>
            </div>
          ) : (
            <p className="whitespace-pre-line text-lg text-gray-700">
              {lesson.description}
            </p>
          )}
          <div className="divider"></div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 font-bold text-gray-500">
              <span>❤️ {likeCount} Likes</span>
              <span>🔖 {saveCount} Saves</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleLike}
                className={`btn ${
                  isLiked ? "btn-error text-white" : "btn-outline"
                }`}
                disabled={isLocked}
              >
                <FaHeart /> {isLiked ? "Liked" : "Like"}
              </button>
              <button
                onClick={handleFavorite}
                className={`btn ${
                  isSaved ? "btn-success text-white" : "btn-outline"
                }`}
                disabled={isLocked}
              >
                <FaBookmark /> {isSaved ? "Saved" : "Save"}
              </button>

              {/* Share Dropdown */}
              <div className="dropdown dropdown-top dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-neutral gap-2 ${
                    isLocked ? "btn-disabled" : ""
                  }`}
                >
                  <FaShareAlt /> Share
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-60 flex-row gap-4 justify-center border"
                >
                  <li>
                    <FacebookShareButton url={shareUrl} hashtag="#DigitalLife">
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                  </li>
                  <li>
                    <WhatsappShareButton url={shareUrl} title={lesson.title}>
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                  </li>
                  <li>
                    <TwitterShareButton url={shareUrl} title={lesson.title}>
                      <XIcon size={40} round />
                    </TwitterShareButton>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SIMILAR LESSONS --- */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-3">
          You Might Also Like
        </h3>
        {similarLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarLessons.slice(0, 3).map((item) => (
              <Link
                to={`/lessons/${item._id}`}
                key={item._id}
                className="card bg-base-100 shadow border hover:shadow-lg"
              >
                <figure className="h-40 w-full">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h4 className="font-bold">{item.title}</h4>
                  <div className="badge badge-sm badge-ghost">
                    {item.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            No similar lessons found matching this category.
          </div>
        )}
      </div>

      {/* --- COMMENTS --- */}
      <div className="card bg-base-100 shadow-xl border p-6">
        <h3 className="text-2xl font-bold mb-6">
          Comments ({comments.length})
        </h3>
        <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-8">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.ibb.co/TmghV6k/user.png"}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              name="comment"
              className="textarea textarea-bordered w-full"
              placeholder="Add a comment..."
              required
            ></textarea>
            <button className="btn btn-primary btn-sm mt-2 float-right gap-2">
              <FaPaperPlane /> Post
            </button>
          </div>
        </form>
        <div className="space-y-4">
          {comments.map((comment, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      comment.userPhoto || "https://i.ibb.co/TmghV6k/user.png"
                    }
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="bg-base-200 p-3 rounded-lg flex-1">
                <h4 className="font-bold text-sm">{comment.userName}</h4>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>
      </div>

      {/* Report Modal */}
      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600 flex items-center gap-2">
            <FaFlag /> Report Lesson
          </h3>
          <form onSubmit={handleReportSubmit}>
            <select
              name="reason"
              className="select select-bordered w-full my-4"
              required
            >
              <option value="">Select Reason</option>
              <option value="Spam">Spam</option>
              <option value="Inappropriate">Inappropriate</option>
            </select>
            <button className="btn btn-error text-white w-full">Submit</button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default LessonDetails;
