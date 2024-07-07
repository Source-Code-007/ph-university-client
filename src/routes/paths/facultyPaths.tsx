import App from "../../App";

export const facultyPaths = [
  { name: "Dashboard", path: "dashboard", element: <App /> },
  { name: "My Faculty", path: "my-faculty", element: <App /> },
  {
    name: "Course management",
    path: "course-management",
    children: [
      { name: "Course", path: "create-course", element: <App /> },
    ],
  },
];
