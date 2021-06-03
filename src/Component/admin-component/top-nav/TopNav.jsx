import React from 'react';
import { Button, Menu } from 'antd';
import './TopNav.scss';

function TopNav() {
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
