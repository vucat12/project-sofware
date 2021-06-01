import React from 'react';
import { Menu } from 'antd';
import './TopNav.scss';
import { GithubOutlined } from '@ant-design/icons';

function TopNav() {
    return (
      <Menu mode="horizontal" className="top-nav">
          <Menu.Item key="user" className="top-nav-user">
            <GithubOutlined style={{fontSize: '20px'}}/>
          </Menu.Item>
      </Menu>
    )
}

export default TopNav
