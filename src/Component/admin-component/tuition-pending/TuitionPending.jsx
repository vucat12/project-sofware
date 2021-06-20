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
        align: 'center'
      },
      {
        title: 'Tên đầy đủ',
        dataIndex: 'full_name',
        align: 'center'
      },
      {
        title: 'Học phí tổng cộng',
        dataIndex: 'total_fee',
        align: 'center'
      },
      {
        title: 'Học phí đã đóng',
        dataIndex: 'total_fee_payment',
        align: 'center'
      },
      {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        align: 'center'
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

    return (
      <div className="tuition-pending">
        <Row className="pt-3 pb-3">
          <Col span={24} className="align-center">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>Quản Lý Sinh viên</Breadcrumb.Item>
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