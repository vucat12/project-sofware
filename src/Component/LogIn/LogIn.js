
import React from 'react';
import './LogIn.scss';
import { Form, Input, Button } from "antd";
import { LogInPage } from '../../services/authen';

export const LogIn = () => {

    const onFinish = (values) => {
        LogInPage(values.username, values.password).then(res => {
            if(res?.status === 200) window.location.pathname = '/admin/home';
        });
      };
    
      const onFinishFailed = (errorInfo) => {
        
      };
   
    return (
        <div className="log-in">
            <div className="background-login log-in-background"></div>
            <div className="log-in-form">
            <div className="log-in-title">ISOMORPHIC</div>
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
                        message: "Please input your username!"
                    }
                    ]}
                >
                    <Input placeholder="Username"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: "Please input your password!"
                    }
                    ]}
                >
                    <Input type="password" placeholder="Password"/>
                </Form.Item>

                <Form.Item className="pt-2">
                    <Button type="primary" htmlType="submit">
                    Sign in
                    </Button>
                </Form.Item>
                </Form>
            <div className="log-in-description">
            username: demo password: demodemo or just click on any button.
            </div>
            </div>
            
        </div>
    )
}
     