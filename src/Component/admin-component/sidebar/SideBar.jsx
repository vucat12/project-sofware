import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  ContainerOutlined,
  MailOutlined,
  CalendarOutlined 
} from '@ant-design/icons';
import React, { useState } from 'react';
import './SideBar.scss';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

function SideBar() {

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  };

    return (
      <div className="side-bar">
        <div className="side-bar-title">
          <div className="home">
            Home
          </div>
          <Button className="btn-collapsed" type="primary" onClick={toggleCollapsed}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
        </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="side-bar-collapsed"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/admin/home">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link to="/admin/calendar-page">
          Calendar
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          <Link to="/admin/student-management">
          Student Management
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />}>
          <Link to="/admin/course-management">
          Course Management
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<AppstoreOutlined />}>
          <Link to="/admin/semester-management">
          Semester Management
          </Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<ContainerOutlined />}>
          <Link to="/admin/open-course">
          Open Course
          </Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<PieChartOutlined />}>
          <Link to="/admin/class-management">
          Class Management
          </Link>
        </Menu.Item>
      </Menu>


      



    </div>
    )
}

export default SideBar
