import { Form, Button, Col, Input, Row, Table, Breadcrumb, Popconfirm } from 'antd'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { getListClass, postNewClass, deleteClassById, updateClassById } from '../../../services/admin/classServices';
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
const [filter, setFilter] = useState({class_name: ''});
const [isModalVisible, setIsModalVisible] = useState(false);
const [isUpdate, setIsUpdate] = useState(null);

const [form] = Form.useForm();

useEffect(() => {
    getDataClass();
}, []);

async function getDataClass() {
  let data = await getListClass(filter);
  data.data.map(el => el.key = el.id)
  setDataSource(data.data);
}

async function deleteClass(event) {
  await deleteClassById(event?.id);
  getDataClass();
}

function updateClass(e) {
  setIsUpdate(e.id);
  setIsModalVisible(true);
  form.setFieldsValue({
    name: e.name,
    description: e.description,
  })
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
        {
          title: 'Hành động',
          render: (e) => <div>
            <span style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => updateClass(e)}>Update</span>
            <Popconfirm
            className="pl-3"
            title={`Are you sure to delete class ${e.name}`}
            onConfirm={() => deleteClass(e)}>
            <a href="">Delete</a>
            </Popconfirm>
            </div>
        }
      ];

    const handleOk = async () => {
      let data = form.getFieldValue();
      if(isUpdate) {
        await updateClassById({...data, id: isUpdate});
        getDataClass();
      }
      else {
        await postNewClass(data);
        getDataClass();
      }
      setIsModalVisible(false);
      form.resetFields();
    };  

    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields();
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
              <Col span={12} className="text-right"><Button type="primary" onClick={() => {setIsModalVisible(true); setIsUpdate(null)}}>Thêm mới</Button></Col>
            </Row>

            <div className="text-center mb-3">
              <span className="mr-2">Tên lớp: </span>
              <Input className="mr-2" style={{width: '200px'}} value={filter.class_name} onChange={(e) => setFilter({...filter, class_name: e.target.value})}/>
              <Button type="primary" onClick={() => getDataClass()}> Tìm kiếm</Button>
            </div>

           <Table
              columns={columns}
              dataSource={dataSource}
           />
        <Modal 
        className="class-management-popup" 
        title="Thêm mới môn học" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        destroyOnClose
        >
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
