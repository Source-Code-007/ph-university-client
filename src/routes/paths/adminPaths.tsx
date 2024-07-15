import App from "../../App";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: <App /> },
  { name: "Test", path: "test", element: <App /> },
  {
    name: "User management",
    children: [
      { name: "Admin", path: "admin", element: <h2>Admin</h2> },
      { name: "Create admin", path: "create-admin", element: <App /> },
      { name: "Faculty", path: "faculty", element: <App /> },
      { name: "Create faculty", path: "create-faculty", element: <App /> },
      { name: "Student", path: "student", element: <App /> },
      { name: "Create student", path: "create-student", element: <App /> },
    ],
  },
];
