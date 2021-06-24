  import {
    SearchOutlined
  } from '@ant-design/icons';
  import { Breadcrumb, Button, Col, Input, Row, Table, Form, notification } from 'antd';
  import Modal from 'antd/lib/modal/Modal';
  import moment from 'moment';
  import React, { useEffect, useState } from 'react';
  import { getDataLecturers, getLecturerById, getLecturerCourse, postNewLecturer, updateLecturer } from '../../../services/admin/lecturerServices';
  import './LecturerManagement.scss';

  const columnCourse = [
    {
      title: 'Tên môn học',
      dataIndex: 'course_name',
      align: 'center',
      sorter: (a, b) => a.course_name.localeCompare(b.course_name)
    },
    {
      title: 'Thứ/ Tiết/ Lớp',
      dataIndex: 'class_name',
      align: 'center',
      sorter: (a, b) => a.class_name.localeCompare(b.class_name)
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
      title: 'Số sinh viên tối đa',
      dataIndex: 'max_quantity_student',
      align: 'center',
      sorter: (a, b) => a.max_quantity_student - b.max_quantity_student,
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'lecturer_name',
      align: 'center',
      sorter: (a, b) => a.lecturer_name.localeCompare(b.lecturer_name)
    },
  ];
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  function LecturerManagement() {
    const [dataSource, setDataSource] = useState([]);
    const [filter, setFilter] = useState({});
    const [dataDetailLecturer, setDataDetailLecturer] = useState({});
    const [dataCourse, setDataCourse] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddNewLecturer, setIsAddNewLecturer] = useState(false);
    const [isUpdateLecturer, setIsUpdateLecturer] = useState(null);
    const [form] = Form.useForm();
  
    const columns = [
      {
        title: 'Tên giảng viên',
        dataIndex: 'full_name',
        align: 'center',
        sorter: (a, b) => a.full_name.localeCompare(b.full_name)
      },
      {
        title: 'Email',
        dataIndex: 'email',
        align: 'center',
        sorter: (a, b) => a.email.localeCompare(b.email)
      },
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        align: 'center',
        sorter: (a, b) => a.username.localeCompare(b.username)
      },
      {
        title: 'Tổng khóa dạy',
        dataIndex: 'total_course',
        align: 'center',
        sorter: (a, b) => a.total_course - b.total_course,
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
      getLecturers();
    }, []);
  
    async function getLecturers() {
      let dataTable = await getDataLecturers(filter);
      dataTable.data.data.map(el => el.key = el.id);
      setDataSource(dataTable.data.data);
    }

    const handleOk = () => {
      setIsModalVisible(false);
      setDataCourse({})
      setIsUpdateLecturer(null)
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      setDataCourse({})
      setIsUpdateLecturer(null)
    };

    const viewDataLesson = async (semesterId, id) => {
      let res = await getLecturerCourse(semesterId, id)
      setDataCourse(res.data.data)
    }

    const handleOkAddNewLecturer = () => {
      const validate = form.validateFields();

      validate.then(async res => {
      await postNewLecturer(res).then(response => {
        notification.open({
          message: 'Success notification',
          description: 'Thêm giảng viên thành công',
          style: {
            width: 600,
          },
        });
        getLecturers();
        setIsAddNewLecturer(false);
        form.resetFields();
      }).catch(error => {
        notification.open({
          message: 'Error notification',
          description: error.response.data.message,
          style: {
            width: 600,
          },
        });
      })

      }).catch(err => {
        notification.open({
          message: 'Error notification',
          description: "Bạn phải hoàn thành đầy các giá trị trước khi tiếp tục",
          style: {
            width: 600,
          },
        });
      })

    }

    const handleCancelNewLecturer = () => {
      setIsAddNewLecturer(false);
      form.resetFields();
    }
  
    const updateDataLecturer = async (id, fullName) => {
      await updateLecturer(id, fullName);
      setIsUpdateLecturer(null)
      getLecturerDataById(id);
      getLecturers();
    }

    function handleEnter(e) {
      if(e.charCode === 13)
      getLecturers();
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
            <Input placeholder="Tìm kiếm..." onChange={(e) => {setFilter({...filter, full_name: e.target.value})}} onKeyPress={handleEnter}/>
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

          <Col offset={5} span={2} className="text-right">
            <Button type="primary" className="button-green"
            onClick={() => setIsAddNewLecturer(true)}>Thêm mới</Button>
          </Col>

        </Row>
        <Table
          className="table"
          columns={columns}
          dataSource={dataSource}
        />

    <Modal width={1000} title="Thông tin giảng viên" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="student-management-popup">
        <div className="lecturer-management-modal">

          <div className="lecturer-management-modal__profile">
            <Row>
              <Col span={8} className="font-bold" style={{alignSelf: 'center'}}>Tên giảng viên: </Col>
              <Col span={16}> 

              {!isUpdateLecturer && 
              <div>
                <span>{dataDetailLecturer.full_name}</span>
                <Button type="link" onClick={() => setIsUpdateLecturer(dataDetailLecturer.full_name)}>Sửa</Button>
              </div>}
              {
                isUpdateLecturer &&
                <div>
                  <Input style={{width: '50%'}} value={isUpdateLecturer} onChange={(e) => setIsUpdateLecturer(e.target.value)}/>
                  <Button type="link" onClick={() => updateDataLecturer(dataDetailLecturer.id, isUpdateLecturer)}>Hoàn thành</Button>
                </div>
              }
              </Col>
            </Row>
            <Row>
              <Col span={8} className="font-bold">Email: </Col>
              <Col span={16}> {dataDetailLecturer.email}</Col>
            </Row>
            <Row>
              <Col span={8} className="font-bold">Tên đăng nhập: </Col>
              <Col span={16}> {dataDetailLecturer.username}</Col>
            </Row>
           </div>
        
          <div className="lecturer-management-modal__information">
            <div className="lecturer-management-modal__information--action">
            {
              dataDetailLecturer.list?.map(el => (<Button style={{display: 'block'}} className="mb-2" onClick={() => viewDataLesson(el.semester_id, dataDetailLecturer.id)}>Học {el.semester_name}
              từ {moment(el.from_date).format("DD/MM/YYYY")} 
              đến {moment(el.to_date).format("DD/MM/YYYY")}</Button>))
            }
            </div>
            { !(dataCourse && Object.keys(dataCourse).length === 0 && dataCourse.constructor === Object) &&
            <div className="student-management-modal__information--detail mt-3">
              <Table dataSource={dataCourse.list} columns={columnCourse} pagination={false} scroll={{ y: 300 }}/>
              <Row>
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

    <Modal width={500} 
    forceRender
    title="Thêm giảng viên" 
    visible={isAddNewLecturer}
    onOk={handleOkAddNewLecturer}
    onCancel={handleCancelNewLecturer}>
      <Form
      {...layout}
      name="basic"
      form={form}
    >
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: 'Tên đăng nhập là bắt buộc và lớn hơn 5 ký tự', min: 5 }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Mật khẩu là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên đầy đủ"
        name="full_name"
        rules={[{ required: true, message: 'Tên đầy đủ là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email là bắt buộc' },
          { type: 'email', message: 'Email không khả dụng' }
        ]}
      >
        <Input />
      </Form.Item>
      </Form>
    </Modal>

      </div>
    )
  }
  
  export default LecturerManagement