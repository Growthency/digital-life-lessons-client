import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart, FaLock, FaUnlock } from "react-icons/fa";

const FeaturedLessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get("https://digital-life-lessons-server.vercel.app/lessons")
      .then((res) => {
        const data = res.data.result ? res.data.result : res.data;

        setLessons(data.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">
          Featured Lessons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300"
            >
              <figure className="h-48 overflow-hidden relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                {lesson.accessLevel === "Premium" && (
                  <div className="absolute top-2 right-2 badge badge-warning gap-1 font-bold shadow-md">
                    <FaLock size={10} /> Premium
                  </div>
                )}
              </figure>
              <div className="card-body text-left">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge badge-primary badge-outline">
                    {lesson.category}
                  </span>
                  <span className="badge badge-secondary badge-outline">
                    {lesson.emotionalTone}
                  </span>
                </div>

                <h2 className="card-title text-lg">{lesson.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {lesson.description.slice(0, 80)}...
                </p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t">
                  <div
                    className={`badge ${
                      lesson.accessLevel === "Premium"
                        ? "badge-warning"
                        : "badge-success text-white"
                    } gap-1 font-semibold`}
                  >
                    {lesson.accessLevel === "Premium" ? (
                      <FaLock size={10} />
                    ) : (
                      <FaUnlock size={10} />
                    )}
                    {lesson.accessLevel}
                  </div>

                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="btn btn-sm btn-primary btn-outline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/public-lessons"
            className="btn btn-neutral px-8 text-lg shadow-lg hover:scale-105 transition-transform"
          >
            View All Lessons
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
