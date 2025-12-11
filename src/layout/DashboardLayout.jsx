import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaBook,
  FaHome,
  FaList,
  FaPlus,
  FaUser,
  FaUsers,
  FaFlag,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-8">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4 absolute top-4 left-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <div className="w-full min-h-screen">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="mb-4 text-2xl font-bold text-primary px-4">
            <Link to="/">Digital Life</Link>
          </li>

          {/* ১. যদি এডমিন হয়, তাহলে এডমিন মেনু দেখাও */}
          {isAdmin && (
            <>
              <li className="menu-title text-gray-500 mt-2">Admin Panel</li>
              <li>
                <NavLink to="/dashboard/admin" end>
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-lessons">
                  <FaList /> Manage Lessons
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/reported-lessons">
                  <FaFlag /> Reported Lessons
                </NavLink>
              </li>
              
            </>
          )}

          
          <div className="divider"></div>
          <li className="menu-title text-gray-500">User Dashboard</li>

          <li>
            <NavLink to="/dashboard" end>
              <FaHome /> User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-lesson">
              <FaPlus /> Add Lesson
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-lessons">
              <FaList /> My Lessons
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-favorites">
              <FaBook /> My Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <FaUser /> My Profile
            </NavLink>
          </li>

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home Page
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
