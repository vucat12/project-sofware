
import React from 'react';
import './LogIn.scss';
import { Form, Input, Button } from "antd";
import { checkAuthenRole, LogInPage } from '../../services/authen';

export const LogIn = () => {

    const onFinish = async (values) => {
        await LogInPage(values.username, values.password);
        if(checkAuthenRole().role==="USER") window.location.pathname='/front/sign-up-subject';
        else window.location.pathname='/admin/home';
      };
    
      const onFinishFailed = (errorInfo) => {
        
      };
   
    return (
        <div className="log-in">
            <div className="background-login log-in-background"></div>
            <div className="log-in-form">
            <div className="log-in-title">ĐĂNG NHẬP</div>
                <Form
            className="pt-4"
                name="basic"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: "Vui Lòng Nhập Tên Đăng Nhập!"
                    }
                    ]}
                >
                    <Input placeholder="Tên Đăng Nhập"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: "Vui Lòng Nhập Mật Khẩu!"
                    }
                    ]}
                >
                    <Input type="password" placeholder="Mật Khẩu"/>
                </Form.Item>

                <Form.Item className="pt-2">
                    <Button type="primary" htmlType="submit">
                    Đăng Nhập
                    </Button>
                </Form.Item>
                </Form>
            <div className="log-in-description">
            </div>
            </div>
            
        </div>
    )
}
     