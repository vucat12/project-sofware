import {
  DeleteOutlined, EditOutlined, SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Form, Input, Popconfirm, Row, Select, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { deleteClassById, getListClass, postNewClass, updateClassById } from '../../../services/admin/classServices';
import './ClassManagement.scss';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function ClassManagement() {
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState({ class_name: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    getDataClass();
  }, []);

  async function getDataClass() {
    let data = await getListClass(filter);
    data.data.map(el => el.key = el.id)
    setDataSource(data.data);
  }

  async function deleteClass(event) {
    await deleteClassById(event?.id);
    getDataClass();
  }

  function updateClass(e) {
    setIsUpdate(e.id);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: e.name,
      description: e.description,
    })
  }

  const columns = [
    {
      title: 'Tên lớp học',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: 'Mô tả lớp học',
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: 'Hành động',
      render: (e) => <div>
        <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => updateClass(e)}><EditOutlined className="icon-edit" /></span>
        <Popconfirm
          className="pl-3"
          title={`Are you sure to delete class ${e.name}`}
          onConfirm={() => deleteClass(e)}>
          <a href=""><DeleteOutlined className="icon-delete" /></a>
        </Popconfirm>
      </div>
    }
  ];

  const handleOk = async () => {
    let data = form.getFieldValue();
    if (isUpdate) {
      await updateClassById({ ...data, id: isUpdate });
      getDataClass();
    }
    else {
      await postNewClass(data);
      getDataClass();
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="class-management">
      <Row className="pt-3 pb-3">
        <Col span={24} className="align-center">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Quản Lý Lớp Học</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={12} className="align-center">
          <Input className="mr-2" placeholder="Tìm kiếm..."
            value={filter.class_name} onChange={(e) => setFilter({ ...filter, class_name: e.target.value })} />
        </Col>
        <Col span={4} style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            className="button-green calendar-page-search__button"
            onClick={() => getDataClass()}
          >
            <SearchOutlined style={{ fontSize: '14px' }} /> Tìm kiếm
          </Button>
        </Col>
        <Col offset={2} span={3} className="text-right" style={{ marginRight: '14px' }}>
          <div>
            <Select className="select" defaultValue="DESC" >
              <Option value="ASC">Tăng Dần</Option>
              <Option value="DESC">Giảm Dần</Option>
            </Select>
          </div>
        </Col>
        <Col span={2} className="text-right">
          <Button type="primary" className="button-green"
            onClick={() => { setIsModalVisible(true); setIsUpdate(null) }}>Thêm mới</Button>
        </Col>
      </Row>
      <Table
        className="table"
        columns={columns}
        dataSource={dataSource}
      />
      <Modal
        className="class-management-popup"
        title="Thêm mới môn học"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form
          form={form}
          {...layout}
          name="basic">
          <Form.Item
            label="Tên lớp học"
            name="name"
            rules={[{ required: true, message: 'Tên lớp học là bắt buộc' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả lớp học"
            name="description"
            rules={[{ required: true, message: 'Mô tả lớp học là bắt buộc' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ClassManagement
