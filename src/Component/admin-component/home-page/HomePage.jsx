import React, { useState, useEffect } from 'react'
import { Card, Tag, Col, Form, Input, Popconfirm, Row, Select, Table } from 'antd';
import './HomePage.scss';
import {
    SmileOutlined
} from '@ant-design/icons';
const title = (content, tag, color) => (
    <Row className="title-wrapper">
        <Col className="title-content" span={16}>
            {content}
        </Col>
        <Col className="title-tag" span={8}>
            <Tag color={color}>{
                tag
            }</Tag>
        </Col>
    </Row>
);
const getDayOfWeek = (current_day) => {
    switch (current_day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return ''
    }
}

function HomePage() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const intervalID = setTimeout(() => {
            setDate(new Date())
        }, 500);

        return () => clearInterval(intervalID);
    });
    return (
        <div className="home-page">
            <Row>
                <Col span={6}>
                    <Card title={title('SL Lớp', 'Trong Ngày', '#508FF4')} className="card">
                        20
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={title('SL Lớp', 'Trong Tuần', '#FFBF43')} className="card">
                        20
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={title('SL Sinh Viên', 'Trong Ngày', '#4BE69D')} className="card">
                        20
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={title('SL Sinh Viên', 'Trong Tuần', '#9267FF')} className="card">
                        20
                    </Card>
                </Col>
            </Row>
            <div className="date-wrapper">
                <Row>
                    <Col span={24}>
                        <div class="date-current">
                            {date.toDateString()}  {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div class="hello">
                            <Tag color="cyan">
                                <SmileOutlined style={{ marginRight: '5px' }} />
                                Hello {getDayOfWeek(date.getDay())}, have a nice day!
                                <SmileOutlined />
                            </Tag>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomePage
