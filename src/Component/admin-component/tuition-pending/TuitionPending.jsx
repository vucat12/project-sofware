import {
    SearchOutlined
  } from '@ant-design/icons';
  import { Breadcrumb, Button, Col, Input, Row, Select, Table } from 'antd';
  import React, { useEffect, useState } from 'react';
import { read_cookie } from '../../../services/admin/commonServices';
  import { getListTuitionPendings, postTuitionPending } from '../../../services/admin/tuitionServices';
  import './TuitionPending.scss';

  const dataSemesters = read_cookie('getSemester');
  const { Option } = Select;
  
  function TuitionPending() {
    const columns = [
      {
        title: 'Tên kỳ học',
        dataIndex: 'semester_name',
        align: 'center',
        sorter: (a, b) => a.semester_name.localeCompare(b.semester_name)
      },
      {
        title: 'Tên đầy đủ',
        dataIndex: 'full_name',
        align: 'center',
        sorter: (a, b) => a.full_name.localeCompare(b.full_name)
      },
      {
        title: 'Học phí tổng cộng',
        dataIndex: 'total_fee',
        align: 'center',
        sorter: (a, b) => a.total_fee.localeCompare(b.total_fee)
      },
      {
        title: 'Học phí đã đóng',
        dataIndex: 'total_fee_payment',
        align: 'center',
        sorter: (a, b) => a.total_fee_payment.localeCompare(b.total_fee_payment)
      },
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        align: 'center',
        sorter: (a, b) => a.username.localeCompare(b.username)
      },
      {
        title: 'Hành động', 
        render: (id) => (<div>
            <Button type="primary" onClick={() => confirmDetail(id, true)}>Xác nhận</Button>
            <Button className="ml-2" type="primary" onClick={() =>  confirmDetail(id, false)} danger >Hủy bỏ</Button>
            </div>),
        align: 'center',
        width: 300,
      }
    ];
  
    const [dataSource, setDataSource] = useState([]);
    const [filter, setFilter] = useState({semester_id: dataSemesters[0].id});
  
    useEffect(() => {
      getDataTuitionPendings();
    }, []);

    const confirmDetail = async (data, status) => {
        await postTuitionPending({id: data.id, status: status});
        getDataTuitionPendings();
    }
  
    async function getDataTuitionPendings() {
      let dataTable = await getListTuitionPendings(filter);
      dataTable.data.data.map(el => el.key = el.id);
      setDataSource(dataTable.data.data);
    }

    useEffect(() => {
      getDataTuitionPendings();
    }, [filter.semester_id])

    function handleEnter(e) {
      if(e.charCode === 13)
      getDataTuitionPendings();
    }
    
    return (
      <div className="tuition-pending">
        <Row className="pt-3 pb-3">
          <Col span={24} className="align-center">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Quản Lý Học Phí Đang Chờ</Breadcrumb.Item>
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
              onClick={() => getDataTuitionPendings()}
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
      </div>
    )
  }
  
  export default TuitionPending