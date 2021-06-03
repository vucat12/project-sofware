import { Form, Button, Col, Input, Row, Table, DatePicker, Breadcrumb } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { getListSemester, postNewSemester } from '../../../services/admin/semesterServices';
import './SemesterManagement.scss';
import moment from 'moment';

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
const [filter, setFilter] = useState(undefined);
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

    return (
        <div className="semester-management">
            <Row className="semester-management-header">
            <Col span={12} className="align-center">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Semester Management</Breadcrumb.Item>
            </Breadcrumb>
            </Col>
              <Col span={12} className="text-right"><Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm mới học kỳ</Button></Col>
            </Row>
           <Table
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
        <DatePicker/>
      </Form.Item>
      <Form.Item
        label="Ngày kết thúc"
        name="to_date"
        rules={[{ required: true, message: 'Ngày kết thúc là bắt buộc' }]}
      >
        <DatePicker/>
      </Form.Item>
      </Form>
        </Modal>
      </div>
    )
}

export default SemesterManagement
