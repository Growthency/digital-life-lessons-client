import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import usePageTitle from "../../hooks/usePageTitle";

const MyFavorites = () => {
  usePageTitle("My Favorites");
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    if (user?.email) {
      
      axiosSecure
        .get(`/favorites/${user.email}`)
        .then((res) => setFavorites(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        axiosSecure.delete(`/favorites/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Removed!", "Lesson removed.", "success");
            const remaining = favorites.filter((item) => item._id !== id);
            setFavorites(remaining);
          }
        });
      }
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        My Favorites ({favorites.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl border">
            <figure className="h-40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg">{item.title}</h2>
              <div className="badge badge-secondary badge-outline">
                {item.category}
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/lessons/${item.lessonId}`}
                  className="btn btn-sm btn-ghost text-blue-600"
                >
                  <FaExternalLinkAlt /> Read
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm btn-ghost text-red-600"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No favorite lessons found.
        </p>
      )}
    </div>
  );
};

export default MyFavorites;
