import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/public-lessons">Public Lessons</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm fixed top-0 w-full z-50">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-2xl font-bold text-primary gap-0 pl-0"
          >
            Digital<span className="text-secondary">Life</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "dark" ? true : false}
            />
            <FaSun className="swap-on fill-current w-6 h-6 text-yellow-500" />
            <FaMoon className="swap-off fill-current w-6 h-6 text-blue-500" />
          </label>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-primary"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User"
                    src={user?.photoURL || "https://i.ibb.co/TmghV6k/user.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="font-bold text-center border-b pb-2 mb-2">
                  {user?.displayName}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="text-red-500">
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm text-white"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
