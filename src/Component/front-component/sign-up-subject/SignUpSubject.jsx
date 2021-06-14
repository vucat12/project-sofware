import { Button, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import { getMyOpenCourse, getOpenCourseSearch, registerOpenCourse } from '../../../services/front-page/openCourseServices';
import './SignUpSubject.scss';

const columns = [
    {
      title: 'Lớp',
      dataIndex: 'class_name',
    },
    {
      title: 'Tên môn học',
      dataIndex: 'course_name',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'lecturer_name',
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'credit_quantity',
    },
    {
      title: 'Số sinh viên đã đăng ký',
      dataIndex: 'current_quantity_student',
    },
    {
      title: 'Số sinh viên tối đa',
      dataIndex: 'max_quantity_student',
    },
    
  ];
  
function SignUpSubject() {
    const informationUser = checkAuthenRole();
    const [dataSource, setDataSource] = useState([]);
    const [dataMyClass, setDataMyClass] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
    }
    const signUp = () => {
      registerOpenCourse(selectedRowKeys);
        setSelectedRowKeys([])
    }

    async function getDataOpenCourse() {
      let res = await getOpenCourseSearch();
      res.data.map(el => el.key = el.id);
      setDataSource(res.data);
    }

    const getDataMyOpenCorse = async () => {
      let res = await getMyOpenCourse();
      setDataMyClass(res.data.list);
    }

    const getCheckbox = (record) => ({
        disabled: record.is_disable
    })

    useEffect(() => {
      getDataOpenCourse();
      getDataMyOpenCorse();
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
                {dataMyClass.map(el => {
                  return <li>{el.course_name}</li>
                })}
            </ol>
            <h4 className="sign-up-title pt-2">
                danh sách lớp học đang mở
            </h4>

    <Button type="default" onClick={() => signUp()}>Đăng ký</Button>
    <Table className="sign-up-table" rowSelection={{selectedRowKeys, onChange: onSelectChange, getCheckboxProps: getCheckbox}} columns={columns} dataSource={dataSource} />

        </div>
    )
}

export default SignUpSubject
