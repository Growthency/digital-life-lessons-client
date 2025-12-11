import { useEffect, useState } from "react";
import { FaUsers, FaBookOpen, FaFlag } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import usePageTitle from "../../hooks/usePageTitle";
const AdminHome = () => {
  usePageTitle("Admin Home");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    totalReports: 0,
  });

  useEffect(() => {
    axiosSecure
      .get("/admin-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // Chart Data
  const data = [
    { name: "Users", value: stats.totalUsers },
    { name: "Lessons", value: stats.totalLessons },
    { name: "Reports", value: stats.totalReports },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Admin Dashboard Overview
      </h2>
      <div className="flex items-center gap-4 mb-8">
        <div className="avatar">
          <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} alt="Admin" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Welcome, {user?.displayName}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow-xl border-l-4 border-blue-500">
          <div className="stat-figure text-blue-500">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>
        <div className="stat bg-base-100 shadow-xl border-l-4 border-green-500">
          <div className="stat-figure text-green-500">
            <FaBookOpen className="text-3xl" />
          </div>
          <div className="stat-title">Total Lessons</div>
          <div className="stat-value">{stats.totalLessons}</div>
        </div>
        <div className="stat bg-base-100 shadow-xl border-l-4 border-yellow-500">
          <div className="stat-figure text-yellow-500">
            <FaFlag className="text-3xl" />
          </div>
          <div className="stat-title">Reported Content</div>
          <div className="stat-value">{stats.totalReports}</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[300px] w-full bg-base-100 p-4 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Platform Growth</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminHome;
