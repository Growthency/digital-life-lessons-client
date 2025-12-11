import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Lottie from "lottie-react";
import usePageTitle from "../../hooks/usePageTitle";

const AddLesson = () => {
  usePageTitle("Add New Lesson");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [isPremium, setIsPremium] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animationData, setAnimationData] = useState(null); 

  // 1. User Premium Check
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        if (res.data.isPremium) {
          setIsPremium(true);
        }
      });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    fetch("https://assets9.lottiefiles.com/packages/lf20_xlkxtmul.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const onSubmit = async (data) => {
    const lessonData = {
      title: data.title,
      description: data.description,
      category: data.category,
      emotionalTone: data.emotionalTone,
      image: data.image || "https://i.ibb.co/P4H6W0h/default-lesson.jpg",
      privacy: data.privacy,
      accessLevel: data.accessLevel,
      author: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    try {
      const res = await axiosSecure.post("/lessons", lessonData);
      if (res.data.insertedId) {
        setShowModal(true); 
        reset();
      }
    } catch (error) {
      toast.error("Failed to add lesson");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/dashboard/my-lessons");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg relative">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Create New Lesson
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Lesson Title</span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Full Story / Insight</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-32"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Category</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Emotional Tone</span>
            </label>
            <select
              {...register("emotionalTone", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Image URL</span>
          </label>
          <input
            {...register("image")}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Privacy</span>
            </label>
            <select
              {...register("privacy", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Access Level</span>
              {isPremium && (
                <span className="badge badge-primary badge-xs ml-2">
                  Premium Unlocked 👑
                </span>
              )}
            </label>
            <select
              {...register("accessLevel", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="Free">Free</option>
              <option value="Premium" disabled={!isPremium}>
                Premium {isPremium ? "" : "(Locked)"}
              </option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white mt-4"
        >
          Publish Lesson
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-base-100 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
            <div className="w-40 h-40 mx-auto">

              {animationData && (
                <Lottie animationData={animationData} loop={false} />
              )}
            </div>
            <h3 className="text-2xl font-bold text-success mt-4">Success!</h3>
            <p className="py-4 text-gray-600">
              Your lesson has been published successfully.
            </p>
            <button
              onClick={handleCloseModal}
              className="btn btn-primary w-full"
            >
              Go to My Lessons
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLesson;
