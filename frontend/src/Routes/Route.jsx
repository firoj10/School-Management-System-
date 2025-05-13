import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import Login from "../Features/auth/Login";
import Register from "../Features/auth/Register";
import AdminDashboard from "../Layout/AdminDashboard";
import TeacherDashboard from "../Layout/TeacherDashboard";
import StudentDashboard from "../Layout/StudentDashboard";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../Layout/Unauthorized";
import LandingPage from "../Layout/LandingPage";
import CreateStudentForm from "../Features/Students/CreateStudentForm";
import PendingApplicationsList from "../Features/Students/ApplicationsList";
import TeacherCreateUpdatePage from "../Features/Teacher/TeacherCreateUpdatePage/TeacherCreateUpdatePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
   
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
    element: <PrivateRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <Main />,
        children: [
          {
            path: "/admin/dashboard/",
            element: <AdminDashboard />,
          },
          {
            path: "PendingApplicationsList",
            element: <PendingApplicationsList />,
          },
          {
            path: "/admin/create-update-page",
            element: <TeacherCreateUpdatePage />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={["teacher","admin"]} />,
    children: [
      {
        element: <Main />,
        children: [
          {
            path: "/teacher/dashboard",
            element: <TeacherDashboard />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={["student","admin"]} />,
    children: [
      {
        element: <Main />,
        children: [
          {
            path: "/student/dashboard",
            element: <StudentDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/createStudentForm",
    element: <CreateStudentForm />,
  },
]);
