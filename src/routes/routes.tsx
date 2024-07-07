import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./paths/adminPaths";
import { facultyPaths } from "./paths/facultyPaths";


console.log(routesGenerator(adminPaths), 'from routes.tsx');

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminPaths)
  },
  {
    path: "/faculty",
    element: <DashboardLayout/>,
    children: routesGenerator(facultyPaths)
  }
]);

export default router;
