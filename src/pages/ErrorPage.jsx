import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import usePageTitle from "../hooks/usePageTitle";
const ErrorPage = () => {
  usePageTitle("404 Error");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest">
        404
      </h1>
      <div className="bg-secondary text-white px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="text-2xl font-semibold md:text-3xl mt-8 mb-4 text-gray-800">
        Sorry, we couldn't find this page.
      </p>
      <p className="mb-8 text-gray-500">
        But dont worry, you can find plenty of other things on our homepage.
      </p>
      <Link to="/" className="btn btn-primary text-white gap-2">
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
