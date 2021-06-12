import { Form, Button, Col, Input, Row, Table, Breadcrumb, Select, Popconfirm } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { read_cookie } from '../../../services/admin/commonServices';
import { deleteOpenCourseById, getListOpenCourse, postNewOpenCourse, updateOpenCourseById } from '../../../services/admin/openCourseServices';
import './OpenCourse.scss';
import {
  DeleteOutlined, EditOutlined, SearchOutlined
} from '@ant-design/icons';

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

  const [isUpdate, setIsUpdate] = useState(null);

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
      align: 'center',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'course_name',
      align: 'center',
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
      align: 'center',
      sorter: {
        compare: (a, b) => a.max_quantity_student - b.max_quantity_student,
        multiple: 10,
      },
    },
    {
      title: 'Học kỳ',
      dataIndex: 'semester',
      align: 'center',
    },
    {
      title: 'Ca',
      dataIndex: 'shifts',
      align: 'center',
    },
    {
      width: 80,
      title: 'Hành động',
      render: (e) => <div>
        <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => updateOpenCourse(e)}><EditOutlined className="icon-edit" /></span>
        <Popconfirm
          className="pl-3"
          title={`Are you sure to delete class ${e.class_name}`}
          onConfirm={() => deleteOpenCourse(e)}>
          <a href=""><DeleteOutlined className="icon-delete" /></a>
        </Popconfirm>
      </div>
    }
  ];

  async function deleteOpenCourse(event) {
    await deleteOpenCourseById(event?.id);
    getDataOpenCourse();
  }

  function updateOpenCourse(e) {
    setIsUpdate(e.id);
    setIsModalVisible(true);

    const class_id = dataClasses.filter(el => el.name === e.class_name);
    const course_id = dataCourses.filter(el => el.name === e.course_name);
    const lecturer_id = dataLecturer.filter(el => el.full_name===e.lecturer_name)
    const semester_id = dataSemesters.filter(el => el.name===e.semester)
    form.setFieldsValue({
      class_id: class_id[0].id,
      course_id: course_id[0].id,
      day_of_week: e.day_of_week,
      lecturer_id: lecturer_id[0].full_name,
      max_quantity_student: e.max_quantity_student,
      semester_id: semester_id[0].id,
      shifts: e.shifts,
    })
  }

  const handleOk = async () => {
    let data = form.getFieldValue();

    if(isUpdate) {
      updateOpenCourseById({id: isUpdate, data: data})
    }
    else await postNewOpenCourse(data);

    getDataOpenCourse();
    setIsModalVisible(false);
    form.resetFields();
    setIsUpdate(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsUpdate(null);
  };

  return (
    <div className="open-course">
      <Row className="pt-3 pb-3">
        <Col span={24} className="align-center">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Đăng Ký Mở Lớp</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={12} className="align-center">
          <Input className="mr-2" placeholder="Tìm kiếm..." onChange={(e) => setFilter({...filter, search: e.target.value})}/>
        </Col>
        <Col span={4} style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            className="button-green calendar-page-search__button"
            onClick={() => getDataOpenCourse()}
          >
            <SearchOutlined style={{ fontSize: '14px' }} /> Tìm kiếm
          </Button>
        </Col>
        <Col offset={2} span={3} className="text-right" style={{ marginRight: '14px' }}>
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
      <Modal
        width={600}
        centered
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
