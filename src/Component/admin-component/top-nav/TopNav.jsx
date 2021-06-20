import React, { useEffect } from 'react';
import { Button, Menu, Row, Col, Popover } from 'antd';
import './TopNav.scss';
import { getClass, getCourse, getLecturer, getSemester, getShift } from '../../../services/admin/commonServices';

function TopNav() {

  useEffect(() => {
    getShift();
    getClass();
    getCourse();
    getLecturer();
    getSemester();
  })

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.pathname = "/login";
  }

  const content = (
    <div className="popup-content-wrapper">
      <ul className="popup-content">
        <li>Thông tin</li>
        <li onClick={() => handleLogout()}>Đăng xuất</li>
      </ul>
    </div>
  );
  return (
    // <Menu mode="horizontal" className="top-nav">
    //     <Menu.Item key="user" className="top-nav-user align-center">
    //     <Button type="primary" onClick={()=> handleLogout()}>Log Out</Button>
    //     </Menu.Item>
    // </Menu>
    <div className="top-nav">
      <Row>
        <Col span={2} offset={22}>
          <div className="icon-wrapper">
            <Popover className="popup" content={content} trigger="click">

              <div className="circle">
              </div>

            </Popover>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TopNav
