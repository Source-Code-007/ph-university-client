import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./paths/adminPaths";
import { facultyPaths } from "./paths/facultyPaths";
import { studentPaths } from "./paths/studentPaths";
import Signin from "../pages/Signin";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute role="admin">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <PrivateRoute role="faculty">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <PrivateRoute role="student">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: routesGenerator(studentPaths),
  },
]);

export default router;
