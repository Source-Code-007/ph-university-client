import App from "../../App";
import AcademicDepartment from "../../pages/admin/AcademicManagement/AcademicDepartment/AcademicDepartment";
import AcademicFaculty from "../../pages/admin/AcademicManagement/AcademicFaculty/AcademicFaculty";
import Admin from "../../pages/admin/UserManagement/Admin/Admin";
import Faculty from "../../pages/admin/UserManagement/Faculty/Faculty";
import Student from "../../pages/admin/UserManagement/Student/Student";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: <App /> },
  {
    name: "Academic management",
    children: [
      {
        name: "Academic department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
      {
        name: "Academic faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
    ],
  },
  {
    name: "User management",
    children: [
      { name: "Admin", path: "admin", element: <Admin /> },
      { name: "Faculty", path: "faculty", element: <Faculty /> },
      { name: "Student", path: "student", element: <Student /> },
    ],
  },
];
