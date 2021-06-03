import React from 'react';
import { Button, Menu } from 'antd';
import './TopNav.scss';
import { useHistory } from 'react-router';

function FrontTopNav() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.pathname = "/login";
  }

  const handleNavigation = (event) => {
    console.log("=========", event)
    switch (event) {
      case 'sign-up-subject':
        history.push("/front/sign-up-subject")
        break;
    
      default:
        break;
    }
  }

    return (
      <Menu mode="horizontal" className="front-top-nav">
          <Menu.Item key="sign-up-subject" className="front-top-nav_subject align-center">
          <Button type="primary" onClick={() => handleNavigation('sign-up-subject')}>Đăng ký học phần</Button>
          </Menu.Item>

          <Menu.Item key="user" className="front-top-nav_user align-center">
          <Button type="primary" onClick={()=> handleLogout()}>Log Out</Button>
          </Menu.Item>
      </Menu>
    )
}

export default FrontTopNav
