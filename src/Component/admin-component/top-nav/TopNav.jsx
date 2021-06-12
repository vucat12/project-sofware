import React, { useEffect } from 'react';
import { Button, Menu } from 'antd';
import './TopNav.scss';
import { getClass, getCourse, getLecturer, getSemester, getShift } from '../../../services/admin/commonServices';

function TopNav() {

  useEffect(() => {
    getShift()
    getClass();
    getCourse();
    getLecturer()
    getSemester();
  })

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.pathname = "/login";
  }
    return (
      <Menu mode="horizontal" className="top-nav">
          <Menu.Item key="user" className="top-nav-user align-center">
          <Button type="primary" onClick={()=> handleLogout()}>Log Out</Button>
          </Menu.Item>
      </Menu>
    )
}

export default TopNav
