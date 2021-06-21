import React, { useState, useEffect } from 'react'
import { Card, Tag, Col, Row } from 'antd';
import './HomePage.scss';
import {
    SmileOutlined
} from '@ant-design/icons';
import { getInfoDashboard } from '../../../services/authen';
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
    const [dataDashBoard, setDataDashBoard] = useState({});

    useEffect(() => {
        const intervalID = setTimeout(() => {
            setDate(new Date())
        }, 500);

        return () => clearInterval(intervalID);
    });

    useEffect(() => {
        getInfoDashboard().then(res => {
            setDataDashBoard(res.data.data);
        })
    }, []);

    return (
        <div className="home-page">
            <Row>
                <Col span={6}>
                    <Card title={title('Lớp trong ngày', 'Trong Ngày', '#508FF4')} className="card">
                        {dataDashBoard.class_in_day}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={title('Lớp trong tuần', 'Trong Tuần', '#FFBF43')} className="card">
                        {dataDashBoard.class_in_week}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={title('Sinh viên trong ngày', 'Trong Ngày', '#4BE69D')} className="card">
                        {dataDashBoard.student_in_day}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title={title('SL Sinh Viên', 'Trong Tuần', '#9267FF')} className="card">
                        {dataDashBoard.student_in_week}
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
