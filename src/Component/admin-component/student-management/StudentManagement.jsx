import {
  SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Input, Row, Table, Form, DatePicker, notification, InputNumber } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getListStudents, getStudentById, getStudentCourse, postNewStudent } from '../../../services/admin/studentServices';
import './StudentManagement.scss';

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

function StudentManagement() {

  const columns = [
    {
      title: 'MSSV',
      dataIndex: 'code',
      align: 'center',
      sorter: (a, b) => a.code - b.code,
    },
    {
      title: 'Khóa học',
      dataIndex: 'school_year',
      align: 'center',
      sorter: (a, b) => a.school_year.localeCompare(b.school_year)
    },
    {
      title: 'Tên đầy đủ',
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
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      align: 'center',
      render: (dateOfBirth) => <span>{moment(dateOfBirth).format("DD/MM/YYYY")}</span>,
      sorter: (a, b) => a.date_of_birth - b.date_of_birth,
    },
    {
      title: 'Tín chỉ đã học',
      dataIndex: 'credit_quantity_experienced',
      align: 'center',
      sorter: {
        compare: (a, b) => a.credit_quantity_present - b.credit_quantity_present,
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
      align: 'center',
      render: (text, data) => <Button onClick={() => getDetailStudent(data)}>Xem chi tiết</Button>,
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataDetailStudent, setDataDetailStudent] = useState({});
  const [dataCourse, setDataCourse] = useState({});
  const [isAddNewStudent, setIsAddNewStudent] = useState(false);
  const [form] = Form.useForm();

  const [validateForm, setValidateForm] = useState({
    valueCode: null,
    validateCode: '', 
    valueUsername: null,
    validateUsername: '',
  });

  useEffect(() => {
    getDataStudents();
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

  const handleOkAddStudent = () => {
    const validate = form.validateFields();
    validate.then(async res => {
      if(validateForm.validateCode === 'error' && validateForm.validateUsername === 'error') {
        notification.open({
          message: 'Error notification',
          description: 'Bạn thành hoàn thành các giá trị trước khi tiếp tục',
          style: {
            width: 600,
          },
        });
      } else {
      let init = form.getFieldValue();
      const dataForm = {
        ...init,
        date_of_birth: moment(init.date_of_birth).format("YYYY-MM-DD") + 'T00:00:00.000Z',
        schoolYear: moment(init.schoolYear).format("YYYY")
      }
      await postNewStudent(dataForm);

      setIsAddNewStudent(false);
      form.resetFields();
      setValidateForm({
        valueCode: null,
        validateCode: '', 
        valueUsername: null,
        validateUsername: '',
      })
      getDataStudents();
      }
    })
    .catch(err => {
      notification.open({
        message: 'Error notification',
        description: 'Bạn thành hoàn thành các giá trị trước khi tiếp tục',
        style: {
          width: 600,
        },
      });
    })

  }

  const onCodeChange = (event) => {
    setValidateForm({...validateForm, valueCode: event.target.value, validateCode: validateCodeNumber(event.target.value)});
  }

  const onUsernameChange = (event) => {
    setValidateForm({...validateForm, valueUsername: event.target.value, validateUsername: validateUsername(event.target.value)})
  }

  const handleCancelAddStudent = () => {
    setIsAddNewStudent(false);
    form.resetFields();
    setValidateForm({
      valueCode: null,
      validateCode: '', 
      valueUsername: null,
      validateUsername: '',
    })
  }

  function validateCodeNumber(code) {
    if(code.length === 8 && !isNaN(code)) return 'success';
    else return 'error';
  }
  
  function validateUsername(username) {
    if(username.length >= 5) return 'success';
    else return 'error';
  }

  function handleEnter(e) {
    if(e.charCode === 13)
    getDataStudents();
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
          <Input placeholder="Tìm kiếm..." onChange={(e) => {setFilter({...filter, full_name: e.target.value})}} onKeyPress={handleEnter}/>
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
        <Col offset={5} span={2} className="text-right">
          <Button type="primary" className="button-green"
          onClick={() => setIsAddNewStudent(true)}>Thêm mới</Button>
        </Col>
      </Row>
      <Table
        className="table"
        columns={columns}
        dataSource={dataSource}
      />
      <Modal width={1000} 
      title="Thông tin sinh viên" 
      visible={isModalVisible} 
      onOk={handleOk} 
      onCancel={handleCancel} 
      className="student-management-popup">
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
   <Table dataSource={dataCourse.course_register} columns={columnCourse} pagination={false} scroll={{ y: 300 }}/>
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

      <Modal width={800} 
      forceRender
      title="Thêm mới sinh viên" 
      visible={isAddNewStudent} 
      onOk={handleOkAddStudent} 
      onCancel={handleCancelAddStudent} 
      className="student-management-add">
        <Form
          form={form}
          name="addStudent">

<Row>
  <Col className="add-col">
    <Form.Item
      label="MSSV"
      name="code"
      hasFeedback
      rules={[{ required: true, message: 'Mã số sinh viên là bắt buộc và chỉ chứa toàn số' }]}
      validateStatus={validateForm.validateCode}
    >
      <Input value={validateForm.valueCode} onChange={onCodeChange}/>
    </Form.Item>
  </Col>
  
  <Col>
  <Form.Item
      label="Ngày sinh"
      name="date_of_birth"
      rules={[{ required: true, message: 'Ngày sinh là bắt buộc' }]}
    >
      <DatePicker />
    </Form.Item>
  </Col>
</Row>
<Row>
  <Col className="add-col">
  <Form.Item
    label="Email"
    name="email"
    hasFeedback
    rules={[
      { required: true, message: 'Email là bắt buộc' },
      { type: 'email', message: 'Email không khả dụng' }
    ]}
  >
    <Input />
  </Form.Item>
  </Col>
  
  <Col>
  <Form.Item
    label="Khoa"
    name="faculty"
    rules={[{ required: true, message: 'Khoa là bắt buộc' }]}
  >
    <Input />
  </Form.Item>
  </Col>
</Row>

<Row>
  <Col className="add-col">
  <Form.Item
    label="Tên đầy đủ"
    name="full_name"
    rules={[{ required: true, message: 'Tên đầy đủ là bắt buộc' }]}
  >
    <Input />
  </Form.Item>
  </Col>
  
  <Col>
  <Form.Item
    label="Tên đặng nhập"
    name="username"
    hasFeedback
    rules={[{ required: true, message: 'Tên đặng nhập là bắt buộc và phải lớn hơn 5 ký tự' }]}
    validateStatus={validateForm.validateUsername}
  >
    <Input value={validateForm.valueUsername} onChange={onUsernameChange}/>
  </Form.Item>
  </Col>
</Row>

<Row>
  <Col className="add-col">
  <Form.Item
    label="Mật khẩu"
    name="password"
    rules={[{ required: true, message: 'Mật khẩu là bắt buộc' }]}
  >
    <Input />
  </Form.Item>
  </Col>
  
  <Col>
  <Form.Item
    label="Năm học"
    name="schoolYear"
    rules={[{ required: true, message: 'Năm học là bắt buộc' }]}
  >
    <DatePicker picker="year" />
  </Form.Item>
  </Col>
</Row>

<Row>
  <Col className="add-col">
  <Form.Item
    label="Tín chỉ đã học"
    name="totalCreditQuantity"
    rules={[{ required: true, message: 'Tín chỉ đã học là bắt buộc' }]}
  >
    <InputNumber />
  </Form.Item>
  </Col>
  
  <Col>
  <Form.Item
    label="Hệ đào tạo"
    name="trainingSystem"
    rules={[{ required: true, message: 'Hệ đào tạo là bắt buộc' }]}
  >
    <Input />
  </Form.Item>
  </Col>
</Row>
        </Form>

      </Modal>

      
    </div>
  )
}

export default StudentManagement