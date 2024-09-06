import AcademicDepartment from "../../pages/admin/AcademicManagement/AcademicDepartment";
import AcademicFaculty from "../../pages/admin/AcademicManagement/AcademicFaculty";
import Batch from "../../pages/admin/Batch";
import Course from "../../pages/admin/Course";
import Admin from "../../pages/admin/UserManagement/Admin";
import Faculty from "../../pages/admin/UserManagement/Faculty";
import Student from "../../pages/admin/UserManagement/Student";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: "Admin home" },
  { name: "Batch", path: "batch", element: <Batch /> },
  { name: "Course", path: "course", element: <Course /> },
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
