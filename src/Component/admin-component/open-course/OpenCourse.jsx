import { Form, Button, Col, Input, Row, Table, Breadcrumb, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { read_cookie } from '../../../services/admin/commonServices';
import { getListOpenCourse, postNewOpenCourse } from '../../../services/admin/openCourseServices';
import './OpenCourse.scss';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const { Option } = Select;

const dataShifts = read_cookie('getShift');
const dataClasses = read_cookie('getClass');
const dataCourses = read_cookie('getCourse');
const dataLecturer = read_cookie('getLecturer');
const dataSemesters = read_cookie('getSemester');

function OpenCourse() {
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
      getDataOpenCourse();
  }, []);

  async function getDataOpenCourse() {
      let data = await getListOpenCourse(filter);
      setDataSource(data.data);
  }

    const columns = [
        {
          title: 'Tên lớp',
          dataIndex: 'class_name',
          align: 'center'
        },
        {
          title: 'Tên khóa học',
          dataIndex: 'course_name',
          align: 'center'
        },
        {
          title: 'Ngày học',
          dataIndex: 'day_of_week',
          align: 'center'
        },
        {
          title: 'Tên giảng viên',
          dataIndex: 'lecturer_name',
          align: 'center'
        },
        {
          title: 'Số lượng sinh viên tối đa',
          dataIndex: 'max_quantity_student',
          align: 'center'
        },
        {
          title: 'Học kỳ',
          dataIndex: 'semester',
          align: 'center'
        },
        {
          title: 'Học kỳ',
          dataIndex: 'shifts',
          align: 'center',
        },
      ];

    const handleOk = async () => {
      let data = form.getFieldValue();

      console.log("====", data);
      // await postNewOpenCourse(data);
      getDataOpenCourse();
      setIsModalVisible(false);
    };  

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <div className="open-course">
            <Row className="open-course-header">
            <Col span={12} className="align-center">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Open Course</Breadcrumb.Item>
            </Breadcrumb>
            </Col>
              <Col span={12} className="text-right"><Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm mới</Button></Col>
            </Row>
           <Table
              columns={columns}
              dataSource={dataSource}
           />
        <Modal 
        width={600}
        className="open-course-popup" 
        title="Thêm mới môn học" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        forceRender>
        <Form
        form={form}
      {...layout}
      name="basic">
      <Form.Item
        label="Chọn lớp"
        name="class_id"
        rules={[{ required: true }]}
      >
        <Select>
          {dataClasses?.map(el => {
            return <Option value={el.id}>{el.name}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Chọn môn học"
        name="course_id"
        rules={[{ required: true }]}
      >
        <Select>
          {dataCourses?.map(el => {
            return <Option value={el.id}>{el.name}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Ngày trong tuần"
        name="day_of_week"
        rules={[{ required: true }]}
      >
         <Select>
            <Option value="MONDAY">Thứ 2</Option>
            <Option value="TUESDAY">Thứ 3</Option>
            <Option value="WEDNESDAY">Thứ 4</Option>
            <Option value="THURSDAY">Thứ 5</Option>
            <Option value="FRIDAY">Thứ 6</Option>
            <Option value="SATURDAY">Thứ 7</Option>
            <Option value="SUNDAY">Chủ nhật</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Tên giảng viên"
        name="lecturer_id"
        rules={[{ required: true }]}
      >
        <Select>
          {dataLecturer?.map(el => {
            return <Option value={el.id}>{el.full_name}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Số sinh viên tối đa"
        name="max_quantity_student"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Học kỳ"
        name="semester_id"
        rules={[{ required: true }]}
      >
        <Select>
          {dataSemesters?.map(el => {
            return <Option value={el.id}>{el.name}</Option>
          })}
        </Select>
      </Form.Item>


      <Form.Item
        label="Ca"
        name="shifts"
        rules={[{ required: true, message: 'Ca là bắt buộc' }]}
      >
        <Select
        mode="multiple"
        >
          {dataShifts?.map(el => {
            return <Option value={el.code}>{el.name}</Option>
          })}
        </Select>
      </Form.Item>


          </Form>
        </Modal>
      </div>
    )
}

export default OpenCourse
