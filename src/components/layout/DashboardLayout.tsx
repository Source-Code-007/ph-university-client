import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { adminPaths } from "../../routes/paths/adminPaths";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children?) {
  return {
    key,
    icon,
    children,
    label,
  };
}

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
const items = sidebarItemsGenerator(adminPaths)

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <h2 className="text-xl md:text-2xl text-white text-center py-2">UMS</h2>
        <Menu
          // onClick={({ key }) => {
          //   key ? navigate(key) : navigate("/dashboard");
          // }}
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="min-h-screen">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
