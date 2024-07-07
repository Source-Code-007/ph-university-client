import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./paths/adminPaths";


console.log(routesGenerator(adminPaths), 'from routes.tsx');

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminPaths)
  },
]);

export default router;
