import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard"; 

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
        ],
      },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={["teacher"]} />,
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
    element: <PrivateRoute allowedRoles={["student"]} />,
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
