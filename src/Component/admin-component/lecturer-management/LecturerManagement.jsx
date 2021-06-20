  import {
    SearchOutlined
  } from '@ant-design/icons';
  import { Breadcrumb, Button, Col, Input, Row, Select, Table } from 'antd';
  import Modal from 'antd/lib/modal/Modal';
  import moment from 'moment';
  import React, { useEffect, useState } from 'react';
  import { getDataLecturers, getLecturerById, getLecturerCourse } from '../../../services/admin/lecturerServices';
  import './LecturerManagement.scss';

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
  
  
  function LecturerManagement() {
    const [dataSource, setDataSource] = useState([]);
    const [filter, setFilter] = useState({});
    const [dataDetailLecturer, setDataDetailLecturer] = useState({});
    const [dataCourse, setDataCourse] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const columns = [
      {
        title: 'Tên giảng viên',
        dataIndex: 'full_name',
        align: 'center'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        align: 'center'
      },
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        align: 'center'
      },
      {
        title: 'Tổng khóa dạy',
        dataIndex: 'total_course',
        align: 'center'
      },
      {
        title: 'Hành động',
        dataIndex: 'id',
        render: (id) => <Button onClick={() => viewDetail(id)}>Xem chi tiết</Button>
      }
    ];

    function viewDetail(id) {
      setIsModalVisible(true)
      getLecturerDataById(id);
    }

    async function getLecturerDataById(id) {
      let res = await getLecturerById(id);
      setDataDetailLecturer(res.data.data);
    }

    useEffect(() => {
      getLecturers()
    }, []);
  
    async function getLecturers() {
      let dataTable = await getDataLecturers(filter);
      dataTable.data.data.map(el => el.key = el.id);
      setDataSource(dataTable.data.data);
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
      let res = await getLecturerCourse(semesterId, id)
      setDataCourse(res.data.data)
    }
  
  
    return (
      <div className="lecturer-management">
        <Row className="pt-3 pb-3">
          <Col span={24} className="align-center">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Quản Lý Giảng Viên</Breadcrumb.Item>
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
              onClick={() => getLecturers()}
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

<Modal width={1000} title="Thông tin giảng viên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="student-management-popup">
        <div className="student-management-modal">

          <div className="student-management-modal__profile">
            <Row>
              <Col span={12} className="font-bold">Tên giảng viên: </Col>
              <Col span={12}> {dataDetailLecturer.full_name}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Email: </Col>
              <Col span={12}> {dataDetailLecturer.email}</Col>
            </Row>
            <Row>
              <Col span={12} className="font-bold">Tên đăng nhập: </Col>
              <Col span={12}> {dataDetailLecturer.username}</Col>
            </Row>
           </div>
        
          <div className="student-management-modal__information">
            <div className="student-management-modal__information--action">
            {
              dataDetailLecturer.list?.map(el => (<Button style={{display: 'block'}} className="mb-2" onClick={() => viewDataLesson(el.semester_id, dataDetailLecturer.id)}>Học {el.semester_name}
              từ {moment(el.from_date).format("DD/MM/YYYY")} 
              đến {moment(el.to_date).format("DD/MM/YYYY")}</Button>))
            }
            </div>
            { !(dataCourse && Object.keys(dataCourse).length === 0 && dataCourse.constructor === Object) &&
            <div className="student-management-modal__information--detail mt-3">
              <Table dataSource={dataCourse.list} columns={columnCourse} pagination={false}/>
              <Row>
                {/* <Col span={12}>
                  <p>Số tín chỉ: <strong>{dataCourse.credit_quantity}</strong></p>
                  <p>Học phí đã đóng: <strong>{dataCourse.fee_completed}</strong></p>
                  <p>Học phí còn nợ: <strong>{dataCourse.fee_debt}</strong></p>
                </Col> */}
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
  
  export default LecturerManagement