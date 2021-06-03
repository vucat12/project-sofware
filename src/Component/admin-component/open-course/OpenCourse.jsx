import { Form, Button, Col, Input, Row, Table, Breadcrumb } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { getListOpenCourse, postNewOpenCourse } from '../../../services/admin/openCourseServices';
import './OpenCourse.scss';


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function OpenCourse() {
const [dataSource, setDataSource] = useState([]);
const [filter, setFilter] = useState({});
const [isModalVisible, setIsModalVisible] = useState(false);

const [form] = Form.useForm();

useEffect(() => {
    getDataOpenCourse();
}, []);

async function getDataOpenCourse() {
    let data = await getListOpenCourse(filter);
    setDataSource(data.data);
}

    const columns = [
        {
          title: 'Tên lớp',
          dataIndex: 'class_name',
          align: 'center'
        },
        {
          title: 'Tên khóa học',
          dataIndex: 'course_name',
          align: 'center'
        },
        {
          title: 'Ngày học',
          dataIndex: 'day_of_week',
          align: 'center'
        },
        {
          title: 'Tên giảng viên',
          dataIndex: 'lecturer_name',
          align: 'center'
        },
        {
          title: 'Số lượng sinh viên tối đa',
          dataIndex: 'max_quantity_student',
          align: 'center'
        },
        {
          title: 'Học kỳ',
          dataIndex: 'semester',
          align: 'center'
        },
        {
          title: 'Học kỳ',
          dataIndex: 'shifts',
          align: 'center',
        },
      ];

    const handleOk = async () => {
      let data = form.getFieldValue();
      await postNewOpenCourse(data);
      getDataOpenCourse();
      setIsModalVisible(false);
    };  

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <div className="open-course">
            <Row className="open-course-header">
            <Col span={12} className="align-center">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Open Course</Breadcrumb.Item>
            </Breadcrumb>
            </Col>
              <Col span={12} className="text-right"><Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm mới</Button></Col>
            </Row>
           <Table
              columns={columns}
              dataSource={dataSource}
           />
        <Modal className="open-course-popup" title="Thêm mới môn học" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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

export default OpenCourse
