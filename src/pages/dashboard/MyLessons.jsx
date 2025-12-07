import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // 1. Import
import usePageTitle from "../../hooks/usePageTitle";

const MyLessons = () => {
  usePageTitle("My Lessions");
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const axiosSecure = useAxiosSecure(); // 2. Hook Call

  useEffect(() => {
    if (user?.email) {
      // 3. Use axiosSecure
      axiosSecure
        .get(`/lessons/user/${user.email}`)
        .then((res) => setLessons(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
            const remaining = lessons.filter((lesson) => lesson._id !== id);
            setLessons(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        My Lessons ({lessons.length})
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={lesson.image} alt="Lesson" />
                    </div>
                  </div>
                </td>
                <td className="font-bold">{lesson.title}</td>
                <td>{lesson.category}</td>
                <td>
                  <span
                    className={`badge ${
                      lesson.privacy === "Public"
                        ? "badge-success"
                        : "badge-ghost"
                    } badge-sm`}
                  >
                    {lesson.privacy}
                  </span>
                </td>
                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/update-lesson/${lesson._id}`}
                    className="btn btn-sm btn-ghost text-blue-600"
                  >
                    <FaEdit className="text-lg" />
                  </Link>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="btn btn-sm btn-ghost text-red-600"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {lessons.length === 0 && (
          <p className="text-center p-4">You haven't added any lessons yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyLessons;
