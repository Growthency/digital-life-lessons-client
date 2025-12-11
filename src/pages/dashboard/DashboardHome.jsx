import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaBook, FaHeart, FaBookmark } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import usePageTitle from "../../hooks/usePageTitle";

const DashboardHome = () => {
  usePageTitle("Dashboard Home");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const [stats, setStats] = useState({
    totalLessons: 0,
    totalFavorites: 0,
    totalLikes: 0,
    chartData: [],
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user-dashboard-stats/${user.email}`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="p-4 w-full">
      <h2 className="text-3xl font-bold mb-4 text-primary">
        Welcome back, {user?.displayName?.split(" ")[0]}! 👋
      </h2>
      <p className="mb-8 text-gray-500">
        Here is your personal growth overview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-primary">
          <div className="stat-figure text-primary">
            <FaBook className="text-3xl" />
          </div>
          <div className="stat-title">Lessons Created</div>
          <div className="stat-value text-primary">{stats.totalLessons}</div>
          <div className="stat-desc">Your shared wisdom</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-secondary">
          <div className="stat-figure text-secondary">
            <FaHeart className="text-3xl" />
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-secondary">{stats.totalLikes}</div>
          <div className="stat-desc">Appreciation earned</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-2xl border-l-4 border-accent">
          <div className="stat-figure text-accent">
            <FaBookmark className="text-3xl" />
          </div>
          <div className="stat-title">My Favorites</div>
          <div className="stat-value text-accent">{stats.totalFavorites}</div>
          <div className="stat-desc">Lessons you saved</div>
        </div>
      </div>

      <div className="bg-base-100 p-6 rounded-2xl shadow-xl border">
        <h3 className="text-xl font-bold mb-6">Your Contribution Activity</h3>
        {stats.chartData.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="lessons"
                  fill="#8884d8"
                  name="Lessons Added"
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <p>Not enough data to show chart yet.</p>
            <p className="text-sm">Start adding lessons to see your growth!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
