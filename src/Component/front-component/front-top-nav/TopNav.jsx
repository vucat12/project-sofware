import React from 'react';
import { Menu } from 'antd';
import './TopNav.scss';
import { useHistory } from 'react-router';

function FrontTopNav() {
  const history = useHistory();

  const handleNavigation = (event) => {

    switch (event.key) {
      case 'sign-up-subject':
        history.push("/front/sign-up-subject")
        break;
      case 'resolve-fee':
        history.push("/front/resolve-fee")
        break;
      case 'edit-profile':
        history.push("/edit-profile")
        break;
      case 'log-out':
        localStorage.removeItem("access_token");
        window.location.pathname = "/login";
        break;
      default:
        break;
    }
  }

  return (
    <div className="nav-wrapper">
      <div className="banner">
      </div>
      <Menu mode="horizontal" className="front-top-nav" onClick={handleNavigation}>
        <Menu.Item key='sign-up-subject' className="front-top-nav_subject align-center">
          <span className="font-bold" >Đăng ký học phần</span>
        </Menu.Item>

        <Menu.Item key='resolve-fee' className="front-top-nav_subject align-center">
          <span className="font-bold" >Thanh Toán Học Phí</span>
        </Menu.Item>

        <Menu.Item key='edit-profile' className="front-top-nav_subject align-center">
          <span className="font-bold">Thông Tin Cá Nhân</span>
        </Menu.Item>

        <Menu.Item key='log-out' className="front-top-nav_user align-center">
          <span className="font-bold" type="primary" >Log Out</span>
        </Menu.Item>
      </Menu>
    </div>

  )
}

export default FrontTopNav
