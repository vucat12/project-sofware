import React, { useEffect } from 'react';
import { Row, Col, Popover, Form, Input, notification } from 'antd';
import './TopNav.scss';
import { getClass, getCourse, getLecturer, getSemester, getShift } from '../../../services/admin/commonServices';
import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { updatePasswordAuth } from '../../../services/authen';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TopNav() {
  const [isModalChangePassword, setIsModalChangePassword] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getShift();
    getClass();
    getCourse();
    getLecturer();
    getSemester();
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.pathname = "/login";
  }

  const content = (
    <div className="popup-content-wrapper">
      <ul className="popup-content">
        <li onClick={() => setIsModalChangePassword(true)}>Đổi mật khẩu</li>
        <li onClick={() => handleLogout()}>Đăng xuất</li>
      </ul>
    </div>
  );

    const handleOk = () => {
      form.validateFields().then(res => {
        console.log(res);
        if(res.old_password === res.new_password) {
          notification.open({
            message: 'Error notification',
            description: 'Mật khẩu cũ không thể giống với mật khẩu mới',
            style: {
              width: 600,
            },
          });
        }
        else {
          updatePasswordAuth(res);
          notification.open({
            message: 'Success notification',
            description: 'Đổi mật khẩu thành công',
            style: {
              width: 600,
            },
          });
          setIsModalChangePassword(false);
          form.resetFields();
        }
      }).catch(err => {
        notification.open({
          message: 'Error notification',
          description: 'Bạn phải hoàn thành các giá trị trước khi tiếp tục',
          style: {
            width: 600,
          },
        });
      })
    }

    const handleCancel = () => {
      setIsModalChangePassword(false);
      form.resetFields();
    }

  return (
    <div className="top-nav">

      <Modal title="Đổi mật khẩu" visible={isModalChangePassword} onOk={handleOk} onCancel={handleCancel}>
      <Form
      {...layout}
      name="basic"
      form={form}
    >
      <Form.Item
        label="Mật khẩu cũ"
        name="old_password"
        rules={[{ required: true, message: 'Mật khẩu cũ là bắt buộc' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu mới"
        name="new_password"
        rules={[{ required: true, message: 'Mật khẩu mới là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
      </Form>
      </Modal>

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
