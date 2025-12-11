import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import usePageTitle from "../../hooks/usePageTitle";

const Profile = () => {
  usePageTitle("My Profile");
  const { user, updateUserProfile } = useAuth();
  const [lessonCount, setLessonCount] = useState(0);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user-stat/${user.email}`)
        .then((res) => setLessonCount(res.data.count));
    }
  }, [user?.email, axiosSecure]);

  const onUpdate = (data) => {
    setLoading(true);
    updateUserProfile(data.name, data.photo)
      .then(() => {
        const userInfo = {
          name: data.name,
          photo: data.photo,
        };

        axiosSecure.patch(`/users/${user.email}`, userInfo).then((res) => {
          if (
            res.data.userResult.modifiedCount > 0 ||
            res.data.lessonResult.modifiedCount > 0
          ) {
            toast.success("Profile Updated Successfully!");
            setLoading(false);
            document.getElementById("profile_modal").close();
            window.location.reload();
          } else {
            setLoading(false);
            document.getElementById("profile_modal").close();
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        My Profile
      </h2>

      <div className="card bg-base-100 shadow-xl border overflow-hidden">
        <div className="bg-primary h-32 w-full opacity-80"></div>
        <div className="card-body -mt-16 items-center text-center">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.ibb.co/TmghV6k/user.png"}
                alt="Profile"
              />
            </div>
          </div>
          <h2 className="card-title text-2xl mt-2">{user?.displayName}</h2>
          <p className="text-gray-500">{user?.email}</p>

          <div className="stats shadow mt-6 w-full max-w-md bg-base-200">
            <div className="stat place-items-center">
              <div className="stat-title">Total Lessons</div>
              <div className="stat-value text-primary">{lessonCount}</div>
              <div className="stat-desc">Created by you</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Member Since</div>
              <div className="stat-value text-secondary text-lg">
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className="card-actions mt-6">
            <button
              onClick={() =>
                document.getElementById("profile_modal").showModal()
              }
              className="btn btn-primary text-white px-8"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <dialog id="profile_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("photo")}
                type="text"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("profile_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary text-white">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
