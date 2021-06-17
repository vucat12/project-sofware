import {
    SearchOutlined
  } from '@ant-design/icons';
  import { Breadcrumb, Button, Col, Input, Row, Select, Table } from 'antd';
  import React, { useEffect, useState } from 'react';
  import { getListLecturers } from '../../../services/admin/lecturerServices';
  import './LecturerManagement.scss';
  
  const { Option } = Select;
  
  function LecturerManagement() {
  
    const columns = [
      {
        title: 'MSSV',
        dataIndex: 'id',
        align: 'center'
      },
      {
        title: 'Tên đầy đủ',
        dataIndex: 'full_name',
        align: 'center'
      },
    ];
  
    const [dataSource, setDataSource] = useState([]);
    const [filter, setFilter] = useState({});
  
    useEffect(() => {
      getDataLecturers()
    }, []);
  
    async function getDataLecturers() {
      let dataTable = await getListLecturers(filter);
      
      dataTable.data.data.map(el => el.key = el.id);
      setDataSource(dataTable.data.data);
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
              onClick={() => getDataLecturers()}
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
        {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="lecturer-management-popup">
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
            <Col span={12} className="font-bold">Tín chỉ đã thực hiện: </Col>
            <Col span={12}> {dataDetailStudent.credit_quantity_experienced}</Col>
          </Row>
          <Row>
            <Col span={12} className="font-bold">Tín chỉ đang thực hiện: </Col>
            <Col span={12}> {dataDetailStudent.credit_quantity_present}</Col>
          </Row>
          <Row>
            <Col span={12} className="font-bold">Trạng thái: </Col>
            <Col span={12}> {dataDetailStudent.fee_status}</Col>
          </Row>
        </Modal> */}
      </div>
    )
  }
  
  export default LecturerManagement