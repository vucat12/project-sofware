import { Button, notification, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import { deleteOpenCourse, getMyOpenCourse, getOpenCourseSearch, registerOpenCourse } from '../../../services/front-page/openCourseServices';
import './SignUpSubject.scss';
import { Collapse } from 'antd';

const { Panel } = Collapse;

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
    const [selectedRowMyClass, setSelectedRowMyClass] = useState([]);
    const [detailInformation, setDetailInformation] = useState({});

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
    }

    const onSelectMyClass = (selectedRowKeys) => {
      setSelectedRowMyClass(selectedRowKeys);
    }

    const deleteMyClass = async () => {
      if(selectedRowMyClass.length <=0) {
        notification.open({
          message: 'Error notification',
          description: "Bạn phải chọn môn để xóa !",
          style: {
            width: 600,
          },
        });
      } else {
      await deleteOpenCourse(selectedRowMyClass);
      getDataMyOpenCourse();
      getDataOpenCourse();
      setSelectedRowMyClass([]);
      }
    }

    const signUp = async () => {
      if(selectedRowKeys.length <=0) {
        notification.open({
          message: 'Error notification',
          description: "Bạn phải chọn môn đăng ký !",
          style: {
            width: 600,
          },
        });
      } else {
        await registerOpenCourse(selectedRowKeys);
        setSelectedRowKeys([]);
        getDataMyOpenCourse();
        getDataOpenCourse();
      }
    }

    async function getDataOpenCourse() {
      let res = await getOpenCourseSearch();
      res.data.map(el => el.key = el.id);
      setDataSource(res.data);
    }

    const getDataMyOpenCourse = async () => {
      let res = await getMyOpenCourse();

      setDetailInformation({total_fee: res.data.total_fee, total_credit: res.data.total_credit})

      res.data.list.map(el => el.key = el.id)
      setDataMyClass(res.data.list);
    }

    const getCheckbox = (record) => ({
        disabled: record.is_disable || record.current_quantity_student === record.max_quantity_student
    })

    useEffect(() => {
      getDataOpenCourse();
      getDataMyOpenCourse();
    }, [])

  return (
    <div className="sign-up">
      <h3 className="sign-up-title pt-2">
        Đăng ký học phần
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
        </div>
      </div>
      <Collapse className="collapse">
        <Panel className="collapse__header" header="Lớp học đã đăng ký" key="1">
          <div className="collapse__content-wrapper">
            <h4 className="sign-up-title mt-2 mb-2">
              Danh sách lớp học đã đăng ký
            </h4>
            <Table bordered pagination={false} rowSelection={{ selectedRowKeys: selectedRowMyClass, onChange: onSelectMyClass }} columns={columns} dataSource={dataMyClass} />
            <Button type="primary" className="button-green" onClick={() => deleteMyClass()}>Xóa Lớp Đã Chọn</Button>
            <div className="sign-up-information">
              <div className="sign-up-infomation__name">
                <p>
                  <span>Tổng số tín chỉ đã đăng ký:</span>
                  <span className="font-bold font-italic"> {detailInformation.total_credit} </span>
                </p>
                <p>
                  <span>Học Phí Tạm Tính:</span>
                  <span className="font-bold font-italic"> {detailInformation.total_fee}</span>
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
      <Table className="table sign-up-table"
        pagination={false}
        rowSelection={{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, getCheckboxProps: getCheckbox }}
        columns={columns}
        dataSource={dataSource}
        size='small'
        scroll={{ y: 800 }} />

    </div>
  )
}

export default SignUpSubject
