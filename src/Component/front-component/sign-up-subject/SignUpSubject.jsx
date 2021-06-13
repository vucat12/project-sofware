import { Button, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import './SignUpSubject.scss';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const dataSource = [];
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const dataSourceRegister = [];
for (let i = 0; i < 5; i++) {
  dataSourceRegister.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}


function SignUpSubject() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  const signUp = () => {
    setSelectedRowKeys([])
  }
  const informationUser = checkAuthenRole();

  useEffect(() => {
    console.log("======", informationUser);
  }, [])

  return (
    <div className="sign-up">
      <h3 className="sign-up-title pt-2">
        Đăng ký học phần học kỳ 1 năm 2018
      </h3>
      <div className="sign-up-information">
        <div className="sign-up-infomation__name">
          <p>
            <span>Tên sinh viên:</span>
            <span className="font-bold font-italic"> {informationUser?.full_name} </span>
          </p>
          <p>
            <span>Mã sinh viên:</span>
            <span className="font-bold font-italic"> {informationUser?.code}</span>
          </p>
          <p><span>Ngày sinh:</span><span> {moment(informationUser?.date_of_birth).format("DD-MM-YYYY")}</span></p>
          <p><span>Giới tính:</span><span> {informationUser?.gender}</span></p>
        </div>
      </div>
      <Collapse className="collapse">
        <Panel className="collapse__header" header="Lớp học đã đăng ký" key="1">
          <div className="collapse__content-wrapper">
            <h4 className="sign-up-title mt-2 mb-2">
              Danh sách lớp học đã đăng ký
            </h4>
            <Table bordered pagination={false} rowSelection={{ selectedRowKeys, onChange: onSelectChange }} columns={columns} dataSource={dataSourceRegister} />
            <Button type="primary" className="button-green">Xóa Lớp Đã Chọn</Button>
            <div className="sign-up-information">
              <div className="sign-up-infomation__name">
                <p>
                  <span>Tổng số tín chỉ đã đăng ký:</span>
                  <span className="font-bold font-italic"> 13 </span>
                </p>
                <p>
                  <span>Học Phí Tạm Tính:</span>
                  <span className="font-bold font-italic"> 5.000.000VNĐ</span>
                </p>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
      <h4 className="sign-up-title pt-2 mt-4">
        danh sách lớp học đang mở
      </h4>
      <Button type="primary" className="button-green" onClick={() => signUp()}>Đăng ký</Button>
      <Table className="table"
        pagination={false}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        columns={columns}
        dataSource={dataSource}
        size='small'
        scroll={{ y: 800 }} />

    </div>
  )
}

export default SignUpSubject
