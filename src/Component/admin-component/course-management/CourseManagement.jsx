import {
  DeleteOutlined, EditOutlined, SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Form, Input, Popconfirm, Row, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { getCourse } from '../../../services/admin/commonServices';
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
  const [filter, setFilter] = useState({ course_name: '' });
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
      align: 'center',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Tín chỉ',
      dataIndex: 'credit_quantity',
      align: 'center',
      sorter: {
        compare: (a, b) => a.credit_quantity - b.credit_quantity,
        multiple: 10,
      },
    },
    {
      title: 'Giá tín chỉ',
      dataIndex: 'price_basic',
      align: 'center',
      sorter: {
        compare: (a, b) => a.price_basic - b.price_basic,
        multiple: 10,
      },
    },
    {
      title: 'Loại',
      dataIndex: 'type_course',
      align: 'center',
      sorter: (a, b) => a.type_course.localeCompare(b.type_course)
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      align: 'center',
      sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
      title: 'Hành động',
      render: (e) => <div>
        <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => updateCourse(e)}><EditOutlined className="icon-edit" /></span>
        <Popconfirm
          className="pl-3"
          title={`Are you sure to delete class ${e.name}`}
          onConfirm={() => deleteCourse(e)}>
          <a href=""><DeleteOutlined className="icon-delete" /></a>
        </Popconfirm>
      </div>
    }
  ];

  const handleOk = async () => {
    let data = form.getFieldValue();
    data.credit_quantity = parseInt(data.credit_quantity);
    data.price_advanced = parseInt(data.price_advanced);
    data.price_basic = parseInt(data.price_basic);

    if (isUpdate) {
      await updateCourseById({ ...data, id: isUpdate });
    } else {
      await postNewCourse(data);
    }
    getDataCourse();
    getCourse();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsUpdate(null);
    form.resetFields();
  };

  function handleEnter(e) {
    if(e.charCode === 13)
    getDataCourse();
  }

  return (
    <div className="course-management">
      <Row className="pt-3 pb-3">
        <Col span={24} className="align-center">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Quản Lý Môn Học</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={12} className="align-center">
          <Input className="mr-2" placeholder="Tìm kiếm..."
            value={filter.course_name} onChange={(e) => setFilter({ ...filter, course_name: e.target.value })} onKeyPress={handleEnter}/>
        </Col>
        <Col span={4} style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            className="button-green calendar-page-search__button"
            onClick={() => getDataCourse()}
          >
            <SearchOutlined style={{ fontSize: '14px' }} /> Tìm kiếm
          </Button>
        </Col>
        <Col offset={2} span={3} className="text-right" style={{ marginRight: '14px' }}>
        </Col>
        <Col span={2} className="text-right">
          <Button type="primary" className="button-green"
            onClick={() => setIsModalVisible(true)}>Thêm mới</Button>
        </Col>
      </Row>

      <Table
        className="table"
        columns={columns}
        dataSource={dataSource}
      />
      <Modal className="course-management-popup" title={isUpdate ? 'Chỉnh sửa môn học' : "Thêm mới môn học"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
