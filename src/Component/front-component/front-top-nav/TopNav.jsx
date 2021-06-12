import React from 'react';
import { Menu } from 'antd';
import './TopNav.scss';
import { useHistory } from 'react-router';

function FrontTopNav() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.pathname = "/login";
  }

  const handleNavigation = (event) => {
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
            <span className="font-bold" onClick={() => handleNavigation('sign-up-subject')}>Đăng ký học phần</span>
          </Menu.Item>

          <Menu.Item key="user" className="front-top-nav_user align-center">
          <span className="font-bold" type="primary" onClick={()=> handleLogout()}>Log Out</span>
          </Menu.Item>
      </Menu>
    )
}

export default FrontTopNav
