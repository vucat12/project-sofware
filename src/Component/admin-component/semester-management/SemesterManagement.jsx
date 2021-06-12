import {
  DeleteOutlined, EditOutlined, SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { deleteSemesterById, getListSemester, postNewSemester, updateSemesterById } from '../../../services/admin/semesterServices';
import './SemesterManagement.scss';


const { Option } = Select;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function SemesterManagement() {
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState({ status: 'OPEN', search: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isUpdate, setIsUpdate] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    getDataSemester();
  }, []);

  async function getDataSemester() {
    let data = await getListSemester(filter);
    setDataSource(data.data);
  }

  const columns = [
    {
      title: 'Tên học kỳ',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'from_date',
      align: 'center',
      render: (from) => <span>{moment(from).format("DD/MM/YYYY")}</span>,
      sorter: {
        compare: (a, b) => a.from_date - b.from_date,
        multiple: 10,
      },
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'to_date',
      align: 'center',
      render: (to) => <span>{moment(to).format("DD/MM/YYYY")}</span>,
      sorter: {
        compare: (a, b) => a.to_date - b.to_date,
        multiple: 10,
      },
    },
    {
      title: 'Hành động',
      render: (e) => <div>
        <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => updateSemester(e)}><EditOutlined className="icon-edit" /></span>
        <Popconfirm
          className="pl-3"
          title={`Are you sure to delete class ${e.name}`}
          onConfirm={() => deleteSemester(e)}>
          <a href=""><DeleteOutlined className="icon-delete" /></a>
        </Popconfirm>
      </div>
    }
  ];

  async function deleteSemester(event) {
    await deleteSemesterById(event?.id);
    getDataSemester();
  }

  function updateSemester(e) {
    setIsUpdate(e.id);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: e.name,
      from_date: moment(e.from_date),
      to_date: moment(e.to_date),
    })
  }


  const handleOk = async () => {
    let data = form.getFieldValue();
    data = {
      ...data, 
      from_date: moment(data.from_date._d).format("YYYY-MM-DD") + 'T00:00:00Z',
      to_date: moment(data.to_date._d).format("YYYY-MM-DD") + 'T00:00:00Z',
    }

    if(isUpdate) await updateSemesterById({id: isUpdate, name: data.name}) 
    else await postNewSemester(data);

    getDataSemester();
    setIsModalVisible(false);
    setIsUpdate(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsUpdate(null);
    form.resetFields();
  };

  function handleStatus(value) {
    setFilter({ ...filter, status: value })
  }

  return (
    <div className="semester-management">
      <Row className="pt-3 pb-3">
        <Col span={24} className="align-center">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Quản Lý Học Kì</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={12} className="align-center">
          <Input className="mr-2" placeholder="Tìm kiếm..." onChange={(e) => setFilter({...filter, search: e.target.value })}/>
        </Col>
        <Col span={2} style={{ height: '100%', display: 'flex' }}>
          <span className="ml-2 mt-1">Trạng thái: </span>
        </Col>
        <Col span={2} className="text-right" style={{ marginRight: '14px' }}>
          <div>
            <Select className="select" defaultValue="OPEN" onChange={handleStatus}>
              <Option value="OPEN">OPEN</Option>
              <Option value="PENDING">PENDING</Option>
              <Option value="CLOSED">CLOSED</Option>
            </Select>
          </div>
        </Col>
         <Col span={4} style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            className="button-green calendar-page-search__button"
            onClick={() => getDataSemester()}
          >
            <SearchOutlined style={{ fontSize: '14px' }} /> Tìm kiếm
          </Button>
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
      <Modal className="semester-management-popup" title="Thêm mới môn học" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
            label="Ngày bắt đầu"
            name="from_date"
            rules={[{ required: true, message: 'Ngày bắt đầu là bắt buộc' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="to_date"
            rules={[{ required: true, message: 'Ngày kết thúc là bắt buộc' }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SemesterManagement
