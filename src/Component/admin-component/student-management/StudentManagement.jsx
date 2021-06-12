import {
  SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Input, Row, Select, Table, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getListStudents, getStudentById } from '../../../services/admin/studentServices';
import './StudentManagement.scss';

const { Option } = Select;

function StudentManagement() {

  const columns = [
    {
      title: 'MSSV',
      dataIndex: 'code',
      render: (text, data) => <a onClick={() => getDetailStudent(data)}>{text}</a>,
      align: 'center'
    },
    {
      title: 'Khóa học',
      dataIndex: 'school_year',
      align: 'center'
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'full_name',
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      align: 'center',
      render: (dateOfBirth) => <span>{moment(dateOfBirth).format("DD/MM/YYYY")}</span>
    },
    {
      title: 'Tín chỉ đã học',
      dataIndex: 'credit_quantity_experienced',
      align: 'center',
      sorter: {
        compare: (a, b) => a.credit_quantity_experienced - b.credit_quantity_experienced,
        multiple: 10,
      },
    },
    {
      title: 'Tín chỉ đang thực hiện',
      dataIndex: 'credit_quantity_present',
      align: 'center',
      sorter: {
        compare: (a, b) => a.credit_quantity_present - b.credit_quantity_present,
        multiple: 10,
      },
    },
    {
      title: 'Trạng thái học phí',
      dataIndex: 'fee_status',
      align: 'center',
      render: (status) => (
        <div>
          <Tag color="success">{status}</Tag>
        </div>)
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataDetailStudent, setDataDetailStudent] = useState({});

  useEffect(() => {
    getDataStudents()
  }, []);

  async function getDataStudents() {
    let dataTable = await getListStudents(filter);
    dataTable.data.map(el => el.key = el.id);
    setDataSource(dataTable.data);
  }

  const getDetailStudent = (data) => {
    getStudentById(data.id).then(res => {
      setDataDetailStudent(res.data);
      setIsModalVisible(true);
    })
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="student-management">
      <Row className="pt-3 pb-3">
        <Col span={24} className="align-center">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Quản Lý Sinh viên</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={12} className="align-center">
          <Input placeholder="Tìm kiếm..." onChange={(e) => {setFilter({...filter, full_name: e.target.value})}}/>
        </Col>
        <Col span={4} style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            className="button-green calendar-page-search__button"
            onClick={() => getDataStudents()}
          >
            <SearchOutlined style={{ fontSize: '14px' }} /> Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Table
        className="table"
        columns={columns}
        dataSource={dataSource}
      />
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="student-management-popup">
        <Row>
          <Col span={12} className="font-bold">MSSV: </Col>
          <Col span={12}> {dataDetailStudent.code}</Col>
        </Row>
        <Row>
          <Col span={12} className="font-bold">Khóa: </Col>
          <Col span={12}> {dataDetailStudent.school_year}</Col>
        </Row>
        <Row>
          <Col span={12} className="font-bold">Tên đầy đủ: </Col>
          <Col span={12}> {dataDetailStudent.full_name}</Col>
        </Row>
        <Row>
          <Col span={12} className="font-bold">Tín chỉ đã thực hiện: </Col>
          <Col span={12}> {dataDetailStudent.credit_quantity_experienced}</Col>
        </Row>
        <Row>
          <Col span={12} className="font-bold">Tín chỉ đang thực hiện: </Col>
          <Col span={12}> {dataDetailStudent.credit_quantity_present}</Col>
        </Row>
        <Row>
          <Col span={12} className="font-bold">Trạng thái: </Col>
          <Col span={12}> {dataDetailStudent.fee_status}</Col>
        </Row>
      </Modal>
    </div>
  )
}

export default StudentManagement