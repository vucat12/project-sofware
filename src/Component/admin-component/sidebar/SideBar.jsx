import {
  CalendarOutlined, HddOutlined, HomeOutlined, MenuOutlined, ReadOutlined, ScheduleOutlined, UsergroupAddOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';

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
        </div>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={false}
        className="side-bar-collapsed"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/admin/home">
            Tổng Quan
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link to="/admin/calendar-page">
            Lịch Làm Việc
          </Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<UsergroupAddOutlined />} title="Quản Lý Người Dùng">
          <Menu.Item key="3">
            <Link to="/admin/student-management">
              Sinh Viên
            </Link>
          </Menu.Item>
          <Menu.Item key="4">Giảng Viên</Menu.Item>
        </SubMenu>
        <Menu.Item key="5" icon={<ReadOutlined />}>
          <Link to="/admin/course-management">
            Quản Lý Môn Học
          </Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<MenuOutlined />}>
          <Link to="/admin/semester-management">
            Quản Lý Học Kì
          </Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<ScheduleOutlined />}>
          <Link to="/admin/open-course">
            Đăng Ký Mở Lớp
          </Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<HddOutlined />}>
          <Link to="/admin/class-management">
            Quản Lý Lớp Học
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default SideBar
