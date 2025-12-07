import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Import
import usePageTitle from "../../hooks/usePageTitle";

const UpdateLesson = () => {
  usePageTitle("Updated Lession");
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const axiosSecure = useAxiosSecure(); // Hook

  useEffect(() => {
    // Use axiosSecure
    axiosSecure.get(`/lessons/${id}`).then((res) => {
      const data = res.data;
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("category", data.category);
      setValue("emotionalTone", data.emotionalTone);
      setValue("image", data.image);
      setValue("privacy", data.privacy);
      setValue("accessLevel", data.accessLevel);
    });
  }, [id, setValue, axiosSecure]);

  const onSubmit = async (data) => {
    const updatedData = {
      title: data.title,
      description: data.description,
      category: data.category,
      emotionalTone: data.emotionalTone,
      image: data.image,
      privacy: data.privacy,
      accessLevel: data.accessLevel,
    };

    try {
      const res = await axiosSecure.patch(`/lessons/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        toast.success("Lesson Updated Successfully!");
        navigate("/dashboard/my-lessons");
      } else {
        toast("No changes made.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update lesson");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Update Lesson
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
            </label>
            <select
              {...register("accessLevel", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white text-lg mt-4"
        >
          Update Lesson
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;
