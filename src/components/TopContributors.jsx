import { useEffect, useState } from "react";
import axios from "axios";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    axios
      .get("https://digital-life-lessons-server.vercel.app/top-contributors")
      .then((res) => setContributors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-primary">
          Top Contributors of the Week
        </h2>
        <p className="mb-10 text-gray-500">
          Meet the wisdom sharers who are inspiring the community.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {contributors.map((user, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-base-200 rounded-xl shadow-md hover:scale-105 transition-transform w-48"
            >
              <div className="avatar mb-4">
                <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photo || "https://i.ibb.co/TmghV6k/user.png"}
                    alt={user.name}
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <div className="badge badge-secondary badge-outline mt-2">
                {user.totalLessons} Lessons
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
