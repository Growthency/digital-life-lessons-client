import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const MostPopular = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get("https://digital-life-lessons-server.vercel.app/popular-lessons")
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Trending Wisdom
          </h2>
          <p className="text-gray-600">
            The most liked and appreciated lessons from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="card bg-base-100 shadow-xl border hover:border-primary transition-colors"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-xl mb-2">{lesson.title}</h2>
                  <div className="badge badge-ghost gap-1">
                    <FaHeart className="text-red-500" /> {lesson.likes || 0}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  {lesson.description.slice(0, 100)}...
                </p>
                <div className="card-actions justify-between items-center mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src={lesson.author?.photo} alt="Author" />
                      </div>
                    </div>
                    <span className="text-xs font-bold">
                      {lesson.author?.name}
                    </span>
                  </div>
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Read
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopular;
