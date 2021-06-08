import { Button, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import './SignUpSubject.scss';

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
  for (let i = 0; i < 46; i++) {
    dataSource.push({
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
                <p><span>Tên sinh viên:</span><span className="font-bold"> {informationUser?.full_name}</span></p>
                <p><span>Mã sinh viên:</span><span className="font-bold"> {informationUser?.code}</span></p>
                <p><span>Ngày sinh:</span><span> {moment(informationUser?.date_of_birth).format("DD-MM-YYYY")}</span></p>
                <p><span>Giới tính:</span><span> {informationUser?.gender}</span></p>
                </div>
            </div>
            <div className="sign-up-class">
                Lớp đã đăng ký
            </div>
            <ol>
                <li>Nhập môn lập trình</li>
                <li>Đại số tuyến tính</li>
                <li>Giải tích</li>
            </ol>
            <h4 className="sign-up-title pt-2">
                danh sách lớp học đang mở
            </h4>

    <Button type="default" onClick={() => signUp()}>Đăng ký</Button>
    <Table rowSelection={{selectedRowKeys, onChange: onSelectChange}} columns={columns} dataSource={dataSource} />

        </div>
    )
}

export default SignUpSubject
