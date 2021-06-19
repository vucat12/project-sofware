import {
  SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Input, Row, Table, Tag } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getListStudents, getStudentById, getStudentCourse } from '../../../services/admin/studentServices';
import './StudentManagement.scss';

const columnCourse = [
  {
    title: 'Tên môn học',
    dataIndex: 'course_name',
    align: 'center'
  },
  {
    title: 'Thứ/ Tiết/ Lớp',
    dataIndex: 'class_name',
    align: 'center'
  },
  {
    title: 'Số tín chỉ',
    dataIndex: 'credit_quantity',
    align: 'center'
  },
  {
    title: 'Số sinh viên hiện tại',
    dataIndex: 'current_quantity_student',
    align: 'center'
  },
  {
    title: 'Số sinh viên tối đa',
    dataIndex: 'max_quantity_student',
    align: 'center'
  },
  {
    title: 'Tên giảng viên',
    dataIndex: 'lecturer_name',
    align: 'center',
  },
];


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
  const [dataCourse, setDataCourse] = useState({});

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
    setDataCourse({})
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDataCourse({})
  };

  const viewDataLesson = async (semesterId, id) => {
    let res = await getStudentCourse(semesterId, id)
    setDataCourse(res.data)
  }

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
      <Modal width={1000} title="Thông tin sinh viên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="student-management-popup">
        <div className="student-management-modal">

          <div className="student-management-modal__profile">
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
              <Col span={12} className="font-bold">Ngày sinh: </Col>
              <Col span={12}> {moment(dataDetailStudent.date_of_birth).format("DD/MM/YYYY")}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Tín chỉ đã thực hiện: </Col>
              <Col span={12}> {dataDetailStudent.total_credit_quantity_experience}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Hệ đào tạo: </Col>
              <Col span={12}> {dataDetailStudent.training_system}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Tổng học phí: </Col>
              <Col span={12}> {dataDetailStudent.total_fee}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Tổng học phí đã đóng: </Col>
              <Col span={12}> {dataDetailStudent.fee_completed}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Số học phí còn nợ: </Col>
              <Col span={12}> {dataDetailStudent.fee_debt}</Col>
            </Row>
          </div>
        
          <div className="student-management-modal__information">
            <div className="student-management-modal__information--action">
            {
              dataDetailStudent.list?.map(el => (<Button onClick={() => viewDataLesson(el.semester_id, dataDetailStudent.id)}>Học {el.semester_name}
              từ {moment(el.from_date).format("DD/MM/YYYY")} 
              đến {moment(el.to_date).format("DD/MM/YYYY")}</Button>))
            }
            </div>
{ !(dataCourse && Object.keys(dataCourse).length === 0 && dataCourse.constructor === Object) &&
 <div className="student-management-modal__information--detail mt-3">
   <Table dataSource={dataCourse.course_register} columns={columnCourse} pagination={false}/>
   <Row>
    <Col span={12}>
      <p>Số tín chỉ: <strong>{dataCourse.credit_quantity}</strong></p>
      <p>Học phí đã đóng: <strong>{dataCourse.fee_completed}</strong></p>
      <p>Học phí còn nợ: <strong>{dataCourse.fee_debt}</strong></p>
    </Col>
    <Col span={12}>
      <p>Từ : <strong>{moment(dataCourse.from_date).format("DD/MM/YYYY")}</strong></p>
      <p>Đến: <strong>{moment(dataCourse.to_date).format("DD/MM/YYYY")}</strong></p>
      <p>Học kì: <strong>{dataCourse.semester_name}</strong></p>
    </Col>
   </Row>
 </div>
}
          </div>

        </div>
        
       
      </Modal>
    </div>
  )
}

export default StudentManagement