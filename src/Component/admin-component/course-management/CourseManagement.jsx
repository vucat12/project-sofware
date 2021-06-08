import { Form, Button, Col, Input, Row, Table, Breadcrumb, Popconfirm } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { deleteCourseById, getListCourse, postNewCourse, updateCourseById } from '../../../services/admin/courseServices';
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
const [filter, setFilter] = useState({course_name: ''});
const [isModalVisible, setIsModalVisible] = useState(false);
const [isUpdate, setIsUpdate] = useState(null);

const [form] = Form.useForm();

useEffect(() => {
    getDataCourse();
}, []);

async function getDataCourse() {
    let data = await getListCourse(filter);
    setDataSource(data.data);
}

async function deleteCourse(event) {
  await deleteCourseById(event?.id);
  getDataCourse();
}

function updateCourse(e) {
  setIsUpdate(e.id);
  setIsModalVisible(true);

  form.setFieldsValue({
    name: e.name,
    credit_quantity: e.credit_quantity,
    price_advanced: e.price_advanced,
    price_basic: e.price_basic,
    type_course: e.type_course,
    description: e.description,
  })
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
        {
          title: 'Mô tả',
          dataIndex: 'description',
          align: 'center'
        },
        {
          title: 'Hành động',
          render: (e) => <div>
            <span style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => updateCourse(e)}>Update</span>
            <Popconfirm
            className="pl-3"
            title={`Are you sure to delete class ${e.name}`}
            onConfirm={() => deleteCourse(e)}>
            <a href="">Delete</a>
            </Popconfirm>
            </div>
        }
      ];

    const handleOk = async () => {
      let data = form.getFieldValue();
      data.credit_quantity = parseInt(data.credit_quantity);
      data.price_advanced = parseInt(data.price_advanced);
      data.price_basic = parseInt(data.price_basic);

      if(isUpdate) {
        await updateCourseById({...data, id: isUpdate});
      }else {
        await postNewCourse(data);
      }
      getDataCourse();
      setIsModalVisible(false);
    };  

    const handleCancel = () => {
      setIsModalVisible(false);
      setIsUpdate(null);
      form.resetFields();
    };

    return (
        <div className="course-management">
            <Row className="course-management-header">
            <Col span={12} className="align-center">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Course Management</Breadcrumb.Item>
            </Breadcrumb>
            </Col>
              <Col span={12} className="text-right"><Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm mới</Button></Col>
            </Row>
            <div className="text-center mb-3">
              <span className="mr-2">Tên khóa: </span>
              <Input className="mr-2" style={{width: '200px'}} value={filter.course_name} onChange={(e) => setFilter({...filter, course_name: e.target.value})}/>
              <Button type="primary" onClick={() => getDataCourse()}> Tìm kiếm</Button>
            </div>
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
