import { Form, Button, Col, Input, Row, Table, Breadcrumb } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { getListClass, postNewClass } from '../../../services/admin/classServices';
import './ClassManagement.scss';


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function ClassManagement() {
const [dataSource, setDataSource] = useState([]);
const [filter, setFilter] = useState({});
const [isModalVisible, setIsModalVisible] = useState(false);

const [form] = Form.useForm();

useEffect(() => {
    getDataClass();
}, []);

async function getDataClass() {
    let data = await getListClass(filter);
    setDataSource(data.data);
}

    const columns = [
        {
          title: 'Tên lớp học',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: 'Mô tả lớp học',
          dataIndex: 'description',
          align: 'center'
        },
      ];

    const handleOk = async () => {
      let data = form.getFieldValue();
      await postNewClass(data);
      getDataClass();
      setIsModalVisible(false);
    };  

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <div className="class-management">
            <Row className="class-management-header">
            <Col span={12} className="align-center">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Class Management</Breadcrumb.Item>
            </Breadcrumb>
            </Col>
              <Col span={12} className="text-right"><Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm mới</Button></Col>
            </Row>
           <Table
              columns={columns}
              dataSource={dataSource}
           />
        <Modal className="class-management-popup" title="Thêm mới môn học" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
        form={form}
      {...layout}
      name="basic">
      <Form.Item
        label="Tên lớp học"
        name="name"
        rules={[{ required: true, message: 'Tên lớp học là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mô tả lớp học"
        name="description"
        rules={[{ required: true, message: 'Mô tả lớp học là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
     </Form>
        </Modal>
      </div>
    )
}

export default ClassManagement
