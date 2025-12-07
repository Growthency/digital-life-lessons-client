import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaLock, FaUnlock } from "react-icons/fa"; // আইকন ইমপোর্ট

const PublicLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFromUrl || "");
  const [sort, setSort] = useState("newest");

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
      setCurrentPage(0);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/lessons?page=${currentPage}&size=${itemsPerPage}&search=${search}&category=${category}&sort=${sort}`
      )
      .then((res) => {
        setLessons(res.data.result);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, search, category, sort]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    setCurrentPage(0);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setSort("newest");
    setCurrentPage(0);
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        All Public Lessons
      </h2>

      {/* --- Filters Section --- */}
      <div className="bg-base-200 p-4 rounded-xl mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearch} className="join w-full lg:w-auto">
          <input
            name="search"
            className="input input-bordered join-item w-full"
            placeholder="Search title..."
          />
          <button className="btn btn-primary join-item">
            <FaSearch />
          </button>
        </form>

        <div className="flex flex-wrap gap-4 w-full lg:w-auto justify-end">
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(0);
            }}
            value={category}
            className="select select-bordered w-full sm:w-auto"
          >
            <option value="">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>

          <select
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(0);
            }}
            value={sort}
            className="select select-bordered w-full sm:w-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most-liked">Most Liked</option>
          </select>

          <button onClick={handleReset} className="btn btn-neutral">
            Reset
          </button>
        </div>
      </div>

      {/* --- Content Display --- */}
      {loading ? (
        <div className="text-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Section */}
                <figure className="h-48 overflow-hidden relative">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  {/* Premium Badge Overlay */}
                  {lesson.accessLevel === "Premium" && (
                    <div className="absolute top-2 right-2 badge badge-warning gap-1 font-bold shadow-md">
                      <FaLock size={10} /> Premium
                    </div>
                  )}
                </figure>

                <div className="card-body">
                  {/* Badges: Category & Emotion */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="badge badge-primary badge-outline">
                      {lesson.category}
                    </span>
                    <span className="badge badge-secondary badge-outline">
                      {lesson.emotionalTone}
                    </span>
                  </div>

                  <h2 className="card-title text-lg">{lesson.title}</h2>

                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>By {lesson.author?.name}</span>
                    <span>❤️ {lesson.likes || 0}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {lesson.description.length > 80
                      ? lesson.description.slice(0, 80) + "..."
                      : lesson.description}
                  </p>

                  {/* Footer: Access Level & Button */}
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
                      className="btn btn-primary btn-sm btn-outline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {lessons.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p className="text-xl">
                No lessons found matching your criteria.
              </p>
            </div>
          )}

          {/* --- Numbered Pagination --- */}
          {numberOfPages > 1 && (
            <div className="flex justify-center mt-12 mb-8">
              <div className="join">
                <button
                  onClick={() =>
                    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)
                  }
                  className="join-item btn btn-outline"
                  disabled={currentPage === 0}
                >
                  Prev
                </button>

                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`join-item btn ${
                      currentPage === page
                        ? "btn-active btn-primary text-white"
                        : "btn-outline"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(
                      currentPage < numberOfPages - 1
                        ? currentPage + 1
                        : numberOfPages - 1
                    )
                  }
                  className="join-item btn btn-outline"
                  disabled={currentPage === numberOfPages - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PublicLessons;
