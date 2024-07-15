import React from "react";
import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { signOut } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

// function getItem(label, key, icon, children?) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// const items = [
//   getItem("Dashboard", "/dashboard", <UserOutlined />),

//   getItem("Academic Info", "/dashboard/academic-info", <InfoCircleOutlined />),
//   getItem("App", "/dashboard/test", <UserOutlined />),

// ];
// const items = [
//   {
//     key: "Test",
//     icon: <UserOutlined />,
//     label: <NavLink to={`/admin/student`}>Student</NavLink>,
//   },
//   {
//     key: "2",
//     icon: <UserOutlined />,
//     label: <NavLink to={`/admin/faculty`}>Faculty</NavLink>,
//   },
//   {
//     key: "2",
//     icon: <UserOutlined />,
//     label: "User management",
//     children: [
//       {
//         key: "22",
//         icon: <UserOutlined />,
//         label: <NavLink to={`/admin/student`}>Student</NavLink>,
//       },
//       {
//         key: "23",
//         icon: <UserOutlined />,
//         label: <NavLink to={`/admin/faculty`}>Faculty</NavLink>,
//       },
//       {
//         key: "24",
//         icon: <UserOutlined />,
//         label: <NavLink to={`/admin/admin`}>Admin</NavLink>,
//       },
//     ],
//   },
// ];

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Sidebar />

      <Layout className="min-h-screen">
        <Header className="bg-white flex justify-between items-center sticky top-0 shadow">
          <ul className="flex gap-1 items-center">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
          <Button onClick={() => dispatch(signOut())} type="default">
            Sign out
          </Button>
        </Header>
        <Content
          style={{ margin: "24px 16px 0" }}
          className="bg-white rounded-lg shadow p-5"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
