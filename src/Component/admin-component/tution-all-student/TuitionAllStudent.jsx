import {
    SearchOutlined
  } from '@ant-design/icons';
  import { Breadcrumb, Button, Col, Input, Row, Select, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
  import React, { useEffect, useState } from 'react';
import { read_cookie } from '../../../services/admin/commonServices';
  import { getTuitionAllStudents, getTuitionDetailStudent, postTuitionStudent } from '../../../services/admin/tuitionServices';
  import './TuitionAllStudent.scss';

  const { Option } = Select;


  const columnDetailStudent = [
    {
      title: 'Thứ/ tiết/ lớp',
      dataIndex: 'class_name',
      align: 'center',
      sorter: (a, b) => a.class_name.localeCompare(b.class_name)
    },
    {
      title: 'Tên môn học',
      dataIndex: 'course_name',
      align: 'center',
      sorter: (a, b) => a.course_name.localeCompare(b.course_name)
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'credit_quantity',
      align: 'center',
      sorter: (a, b) => a.credit_quantity - b.credit_quantity,
    },
    {
      title: 'Số sinh viên hiện tại',
      dataIndex: 'current_quantity_student',
      align: 'center',
      sorter: (a, b) => a.current_quantity_student - b.current_quantity_student,
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'lecturer_name',
      align: 'center',
      sorter: (a, b) => a.lecturer_name.localeCompare(b.lecturer_name)
    },
    {
      title: 'Số sinh viên tối đa',
      dataIndex: 'max_quantity_student',
      align: 'center',
      sorter: (a, b) => a.max_quantity_student - b.max_quantity_student,
    },
  ];


  
  function TuitionAllStudent() {
  const dataSemesters = read_cookie('getSemester');

    const columns = [
      {
        title: 'Tên đầy đủ',
        dataIndex: 'full_name',
        align: 'center',
        sorter: (a, b) => a.full_name.localeCompare(b.full_name)
      },
      {
        title: 'Tổng số tín chỉ ở học kỳ',
        dataIndex: 'total_credit_in_semester',
        align: 'center',
        sorter: (a, b) => a.total_credit_in_semester - b.total_credit_in_semester,
      },
      {
        title: 'Tổng học phí trong học kỳ',
        dataIndex: 'total_fee_in_semester',
        align: 'center',
        sorter: (a, b) => a.total_fee_in_semester.localeCompare(b.total_fee_in_semester)
      },
      {
        title: 'Học phí còn nợ',
        dataIndex: 'total_fee_debt',
        align: 'center',
        sorter: (a, b) => a.total_fee_debt.localeCompare(b.total_fee_debt)
      },
      {
        title: 'Học phí phải trả',
        dataIndex: 'total_fee_payment',
        align: 'center',
        sorter: (a, b) => a.total_fee_payment.localeCompare(b.total_fee_payment)
      },
      {
        title: 'Hành động', 
        render: (data) => (<div>
            <Button type="primary" onClick={() => confirmDetail(data)}> {data.is_completed ? 'Đã hoàn thành' : 'Xác nhận'}</Button>
            <Button className="ml-2" danger onClick={() => viewDetail(data)}>Xem chi tiết</Button>
            </div>),
        align: 'center',
        width: 300,
      }
    ];
  
    const [dataSource, setDataSource] = useState([]);
    const [filter, setFilter] = useState({semester_id: dataSemesters[0]?.id});
    const [dataDetailStudent, setDataDetailStudent] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    useEffect(() => {
        getTuitionAll();
    }, []);

    const confirmDetail = async (data) => {
      await postTuitionStudent({student_id: data.student_id, semester_id: filter.semester_id});
      getTuitionAll();
    }
    
    const viewDetail = async (data) => {
      let res = await getTuitionDetailStudent(filter.semester_id, data.student_id);
      setDataDetailStudent(res.data.data);
      setIsModalVisible(true)
    }
  
    async function getTuitionAll() {
      let dataTable = await getTuitionAllStudents(filter);
      dataTable.data.data.map(el => el.key = el.id);
      setDataSource(dataTable.data.data);
    }

    const handleOk = () => {
      setIsModalVisible(false);
    }

    const handleCancel = () => {
      setIsModalVisible(false);
    }

    useEffect(() => {
      getTuitionAll();
    }, [filter.semester_id])

    function handleEnter(e) {
      if(e.charCode === 13)
      getTuitionAll();
    }

    return (
      <div className="tuition-all-student">
        <Row className="pt-3 pb-3">
          <Col span={24} className="align-center">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Quản Lý Tất Cả Học Phí</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="align-center">
            <Input placeholder="Tìm kiếm..." onChange={(e) => {setFilter({...filter, full_name: e.target.value})}} onKeyPress={handleEnter}/>
          </Col>
          <Col span={4} style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              className="button-green calendar-page-search__button"
              onClick={() => getTuitionAll()}
            >
              <SearchOutlined style={{ fontSize: '14px' }} /> Tìm kiếm
            </Button>
          </Col>

          <Col offset={2} span={3} className="text-right" style={{ marginRight: '14px' }}>
            <Select value={filter.semester_id} onChange={(e) => setFilter({...filter, semester_id: e})}>
              {dataSemesters?.map(el => {
                return <Option value={el.id}>{el.name}</Option>
              })}
            </Select>
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
              <Col span={12} className="font-bold">Tên học kì: </Col>
              <Col span={12}> {dataDetailStudent.semester_name}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Tổng số tín chỉ: </Col>
              <Col span={12}> {dataDetailStudent.credit_quantity}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Học phí đã hoàn thành: </Col>
              <Col span={12}> {dataDetailStudent.fee_completed}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Học phí còn nợ: </Col>
              <Col span={12}> {dataDetailStudent.fee_debt}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Từ ngày: </Col>
              <Col span={12}> {moment(dataDetailStudent.from_date).format("DD/MM/YYYY")}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Đến ngày: </Col>
              <Col span={12}> {moment(dataDetailStudent.to_date).format("DD/MM/YYYY")}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Tổng học phí: </Col>
              <Col span={12}> {dataDetailStudent.total_fee}</Col>
            </Row>
          </div>
          <div className="student-management-modal__information">
            <Table dataSource={dataDetailStudent.course_register} columns={columnDetailStudent} pagination={false}/>
          </div>
        </div>
      </Modal>


      </div>
    )
  }
  
  export default TuitionAllStudent