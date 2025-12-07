import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";

const FeaturedLessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/lessons")
      .then((res) => {
        // ডিবাগ করার জন্য কনসোলে প্রিন্ট করছি
        console.log("Home Page Lessons Data:", res.data);

        let data = [];
        // ১. যদি সরাসরি অ্যারে আসে (Old method)
        if (Array.isArray(res.data)) {
          data = res.data;
        }
        // ২. যদি অবজেক্ট আসে এবং ভেতরে result থাকে (Pagination method)
        else if (res.data.result && Array.isArray(res.data.result)) {
          data = res.data.result;
        }

        // ৩. লেটেস্ট ৬টা সেট করো
        setLessons(data.slice(0, 6));
      })
      .catch((err) => console.error("Featured Lessons Error:", err));
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary">
          Featured Lessons
        </h2>

        {/* Cards Grid */}
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
                {/* Image Overlay for Premium */}
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
                  {/* Access Level */}
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

                  {/* Read More */}
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

        {/* View All Button */}
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
