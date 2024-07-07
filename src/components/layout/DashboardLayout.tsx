import React from 'react';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { routesGenerator } from '../../utils/routesGenerator';
import { adminPaths } from '../../routes/paths/adminPaths';

const { Header, Content, Sider } = Layout;


function getItem(label, key, icon, children?) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
console.log(routesGenerator(adminPaths), 'from routes.tsx');
  
  const items = [
    getItem("Dashboard", "/dashboard", <UserOutlined />),
  
    getItem("Academic Info", "/dashboard/academic-info", <InfoCircleOutlined />),
    getItem("App", "/dashboard/test", <UserOutlined />),

  ];

const DashboardLayout: React.FC = () => {

  const navigate = useNavigate()

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
        <h2 className='text-xl md:text-2xl text-white text-center py-2'>UMS</h2>
        <Menu
          onClick={({ key }) => {
            key ? navigate(key) : navigate("/dashboard");
          }}
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className='min-h-screen'>
        <Header style={{ padding: 0, }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360
            }}
          >
           <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;