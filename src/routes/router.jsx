import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LessonDetails from "../pages/LessonDetails";
import PublicLessons from "../pages/PublicLessons";
import Pricing from "../pages/Pricing";
import PaymentSuccess from "../pages/PaymentSuccess";
import ErrorPage from "../pages/ErrorPage";
import PaymentFail from "../pages/PaymentFail";

// Dashboard Components
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import AddLesson from "../pages/dashboard/AddLesson";
import MyLessons from "../pages/dashboard/MyLessons";
import UpdateLesson from "../pages/dashboard/UpdateLesson";
import MyFavorites from "../pages/dashboard/MyFavorites";

// Admin Components
import AdminHome from "../pages/dashboard/AdminHome";
import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageLessons from "../pages/dashboard/ManageLessons";
import ReportedLessons from "../pages/dashboard/ReportedLessons";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "public-lessons",
        element: <PublicLessons />,
      },
      {
        path: "lessons/:id",
        element: <LessonDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment/fail",
        element: <PaymentFail />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      // --- User Routes ---
      {
        path: "", // /dashboard
        element: <DashboardHome />,
      },
      {
        path: "add-lesson",
        element: <AddLesson />,
      },
      {
        path: "my-lessons",
        element: <MyLessons />,
      },
      {
        path: "my-favorites",
        element: <MyFavorites />,
      },
      {
        path: "update-lesson/:id",
        element: <UpdateLesson />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // --- Admin Routes (Secured) ---
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-lessons",
        element: (
          <AdminRoute>
            <ManageLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin/reported-lessons",
        element: (
          <AdminRoute>
            <ReportedLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <Profile />
          </AdminRoute>
        ),
      },
    ],
  },
]);
