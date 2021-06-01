import { Form, Button, Col, Input, Row, Table } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useRef, useState } from 'react'
import { getListCourse, postNewCourse } from '../../../services/admin/courseServices';
import './CourseManagement.scss';


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function CourseManagement() {
const [dataSource, setDataSource] = useState([]);
const [filter, setFilter] = useState({});
const [isModalVisible, setIsModalVisible] = useState(false);
const [dataPost, setDataPost] = useState({});

const [form] = Form.useForm();

useEffect(() => {
    getDataCourse();
}, []);

async function getDataCourse() {
    let data = await getListCourse(filter);
    setDataSource(data.data);
}

    const columns = [
        {
          title: 'Tên môn',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: 'Tín chỉ',
          dataIndex: 'credit_quantity',
          align: 'center'
        },
        {
          title: 'Giá tín chỉ',
          dataIndex: 'price_advanced',
          align: 'center'
        },
        {
          title: 'Giá tín chỉ học lại',
          dataIndex: 'price_basic',
          align: 'center'
        },
        {
          title: 'Loại',
          dataIndex: 'type_course',
          align: 'center'
        },
      ];

    const handleOk = async () => {
      let data = form.getFieldValue();
      data.credit_quantity = parseInt(data.credit_quantity);
      data.price_advanced = parseInt(data.price_advanced);
      data.price_basic = parseInt(data.price_basic);
      await postNewCourse(data);
      getDataCourse();
      setIsModalVisible(false);
    };  

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <div className="course-management">
            <Row className="course-management-header">
                <Col span={12}><Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm mới</Button></Col>
                <Col span={12}></Col>
            </Row>
           <Table
              columns={columns}
              dataSource={dataSource}
           />
        <Modal className="course-management-popup" title="Thêm mới môn học" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
        form={form}
      {...layout}
      name="basic">
      <Form.Item
        label="Tên môn học"
        name="name"
        rules={[{ required: true, message: 'Tên môn học là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số tín chỉ"
        name="credit_quantity"
        rules={[{ required: true, message: 'Số tín chỉ là bắt buộc' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Giá cơ bản"
        name="price_basic"
        rules={[{ required: true, message: 'Giá cơ bản là bắt buộc' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Giá khuyến mãi"
        name="price_advanced"
        rules={[{ required: true, message: 'Giá khuyến mãi là bắt buộc' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Mô tả là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Loại khóa học"
        name="type_course"
        rules={[{ required: true, message: 'Loại khóa học là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
          </Form>
        </Modal>
      </div>
    )
}

export default CourseManagement
