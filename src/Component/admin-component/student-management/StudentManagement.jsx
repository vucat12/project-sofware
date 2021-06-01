import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Tag } from 'antd';
import { getListStudents, getStudentById } from '../../../services/admin/studentServices';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import './StudentManagement.scss';
import { Select } from 'antd';

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
      align: 'center'
    },
    {
      title: 'Tín chỉ đang thực hiện',
      dataIndex: 'credit_quantity_present',
      align: 'center'
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

  const [dataSource, setDataSource]= useState([]);
  const [filter, setFilter] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataDetailStudent, setDataDetailStudent] = useState({});

  useEffect(() => {
    getDataStudents()
  }, []);

  useEffect(() => {
    getDataStudents(); // This is be executed when the state changes
}, [filter]);

  async function getDataStudents() {
    let dataTable = await getListStudents(filter);
    dataTable.data.contents.map(el => el.key = el.id);
    setDataSource(dataTable.data.contents);
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

  function handleChange(value) {
    setFilter({...filter, sort_direction: value});
  }

    return (
        <div className="student-management">
          <div className="student-management-search">
          <Select defaultValue="DESC" style={{ width: 120 }} onChange={handleChange}>
            <Option value="ASC">ASC</Option>
            <Option value="DESC">DESC</Option>
          </Select>
          </div>
             <Table
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