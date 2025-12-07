import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  // ১. যদি ডাটা লোডিং অবস্থায় থাকে, স্পিনার দেখাও
  if (loading || isAdminLoading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ২. যদি ইউজার থাকে এবং সে এডমিন হয়, তবে ঢুকতে দাও
  if (user && isAdmin) {
    return children;
  }

  // ৩. নাহলে লগআউট করিয়ে দাও বা হোম পেজে পাঠিয়ে দাও
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
