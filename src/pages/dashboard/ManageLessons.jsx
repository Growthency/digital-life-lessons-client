import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // ইমপোর্ট
import usePageTitle from "../../hooks/usePageTitle";

const ManageLessons = () => {
  usePageTitle("Manage Lessions");
  const [lessons, setLessons] = useState([]);
  const axiosSecure = useAxiosSecure(); // হুক

  useEffect(() => {
    axiosSecure
      .get("/all-lessons")
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const handleDelete = (lesson) => {
    Swal.fire({
      title: "Delete this lesson?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${lesson._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Lesson removed.", "success");
            const remaining = lessons.filter((l) => l._id !== lesson._id);
            setLessons(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Manage All Lessons ({lessons.length})
      </h2>
      <div className="overflow-x-auto bg-base-100 shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author Email</th>
              <th>Privacy</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.title}</td>
                <td>{lesson.author?.email}</td>
                <td>{lesson.privacy}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/lessons/${lesson._id}`}
                    target="_blank"
                    className="btn btn-ghost btn-xs text-blue-600"
                  >
                    <FaExternalLinkAlt />
                  </Link>
                  <button
                    onClick={() => handleDelete(lesson)}
                    className="btn btn-ghost btn-xs text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
