import {
  SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getListSemester, postNewSemester } from '../../../services/admin/semesterServices';
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
  const [filter, setFilter] = useState({ status: 'OPEN' });
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      render: (from) => <span>{moment(from).format("DD/MM/YYYY")}</span>
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'to_date',
      align: 'center',
      render: (to) => <span>{moment(to).format("DD/MM/YYYY")}</span>
    },
  ];

  const handleOk = async () => {
    let data = form.getFieldValue();
    data = {
      ...data,
      from_date: moment(data.from_date._d).format("YYYY-MM-DD") + 'T00:00:00Z',
      to_date: moment(data.to_date._d).format("YYYY-MM-DD") + 'T00:00:00Z',
    }
    await postNewSemester(data);
    getDataSemester();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <Input className="mr-2" placeholder="Tìm kiếm..." />
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
        <Col span={2} style={{ height: '100%', display: 'flex' }}>
          <span className="mr-2">Trạng thái: </span>
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
