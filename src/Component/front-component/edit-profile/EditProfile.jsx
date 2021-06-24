import { Modal, Button, Input, Form, DatePicker, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import { getCalendarList, getStudentFeeTotal, updateProfile } from '../../../services/front-page/resolveFeeServices';
import './EditProfile.scss';

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const columns = [
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
        render: (STT, data, m) => <div>{m+1}</div>
    },
    {
      title: 'Môn học',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Sĩ số',
      dataIndex: 'current_quantity_student',
      key: 'current_quantity_student',
    },
    {
      title: 'Thứ/Tiết/Phòng',
      dataIndex: 'class_name',
      key: 'class_name',
    },
    {
      title: 'Số lượng sinh viên tối đa',
      dataIndex: 'max_quantity_student',
      key: 'max_quantity_student',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'lecturer_name',
      key: 'lecturer_name',
    },
  ];
    

function EditProfile() {
    const [informationUser, setInformationUser] = useState(checkAuthenRole());
    const [isVisible, setIsVisible] = useState(false);
    const [dataTotal, setDataTotal] = useState({});
    const [calendarStudent, setCalendarStudent] = useState([]);

    const [form] = Form.useForm();

    const confirmUpdateStudent = () => {
        const {code, ...dataProfile} = form.getFieldValue();
        const isEmpty = !Object.values(dataProfile).every(x => !!x);
        if(isEmpty) {
            form.validateFields()
        } else {
            dataProfile.date_of_birth = moment(dataProfile.date_of_birth).format("YYYY-MM-DD") + 'T00:00:00.000Z';
            updateProfile(dataProfile).then(res => {
                if(res.status === 200) {
                    setInformationUser(form.getFieldsValue())
                }
            });
            setIsVisible(false);
        }
    }

    const editProfile = () => {
        form.setFieldsValue({
            full_name: informationUser.full_name,
            code: informationUser.code,
            date_of_birth: moment(informationUser.date_of_birth),
            faculty: informationUser.faculty,
            training_system: informationUser.training_system
        }) 
        setIsVisible(true);
    }

    async function getDataFee() {
        let data = await getStudentFeeTotal();
        setDataTotal(data);
    }

    async function getCalendarStudent() {
        const res = await getCalendarList();
        setCalendarStudent(res.data);
    } 

    useEffect(() => {
        getDataFee();
        getCalendarStudent();
    }, []);

    const renderSemesterTable = (el) => {
        return (
            <div className="pt-2">
                <h3 className="edit-profile-fee-title pt-2">Thời khóa biểu {el.name} từ {moment(el.from_date).format("DD/MM/YYYY")} đến {moment(el.to_date).format("DD/MM/YYYY")}</h3>
                <Table dataSource={el.timetable} columns={columns} pagination={false} />;
            </div>
        )
    }

  return (
    <div className="edit-profile">
    <h3 className="edit-profile-head pt-2">Bảng điều khiển sinh viên</h3>
    <div className="edit-profile-title">
        <span>Thông tin sinh viên</span>
        <div className="edit-profile-title__edit">
            <Button type="link" onClick={() => editProfile()}>Chỉnh sửa thông tin</Button>
        </div>
    </div>
    <div className="edit-profile-table">
        <table style={{width: '100%'}}>
            <tr>
                <td>Họ và tên</td>
                <td><strong>{informationUser.full_name}</strong></td>
            </tr>
            <tr>
                <td>MSSV</td>
                <td><strong>{informationUser.code}</strong></td>
            </tr>
            <tr>
                <td>Ngày sinh</td>
                <td><strong>{moment(informationUser.date_of_birth).format("DD/MM/YYYY")}</strong></td>
            </tr>
            <tr>
                <td>Khoa</td>
                <td><strong>{informationUser.faculty}</strong></td>
            </tr>
            <tr>
                <td>Hệ đào tạo</td>
                <td><strong>{informationUser.training_system}</strong></td>
            </tr>
        </table>
    </div>


    <h3 className="edit-profile-fee-title pt-2">Tổng học phí của sinh viên</h3>
    <div className="edit-profile-total">
        <div>Số TC học phí: <strong>{dataTotal?.credit_quantity}</strong></div>
        <div>Học phí phải đóng: <strong>{dataTotal?.total_fee}</strong></div>
        <div>Học phí đã đóng: <strong>{dataTotal?.fee_completed}</strong></div>
        <div>Học phí còn nợ: <strong>{dataTotal?.fee_debt}</strong></div>
    </div>

    
    {calendarStudent.map(el => renderSemesterTable(el))}

    <Modal 
    forceRender
    centered
    title="Basic Modal" 
    visible={isVisible} 
    onOk={confirmUpdateStudent} 
    onCancel={() => setIsVisible(false)}>
        <Form className="edit-profile-modal" form={form} name="dynamic_rule">
            <Form.Item {...formItemLayout}
                name="full_name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Họ và tên là bắt buộc!' }]}
            >
                <Input placeholder="Please input your name" />
            </Form.Item>
            <Form.Item {...formItemLayout}
                name="code"
                label="MSSV"
            >
                <Input placeholder="Please input your nickname" disabled/>
            </Form.Item>
            <Form.Item {...formItemLayout}
                name="date_of_birth"
                label="Ngày sinh"
                rules={[{ required: true, message: 'Ngày sinh là bắt buộc!' }]}
            >
                <DatePicker placeholder="Please input your nickname" />
            </Form.Item>
            <Form.Item {...formItemLayout}
                name="faculty"
                label="Khoa"
                rules={[{ required: true, message: 'Khoa là bắt buộc!' }]}
            >
                <Input placeholder="Please input your nickname" />
            </Form.Item>
            <Form.Item {...formItemLayout}
                name="training_system"
                label="Hệ đào tạo"
                rules={[{ required: true, message: 'Hệ đào tạo là bắt buộc!' }]}
            >
                <Input placeholder="Please input your nickname" />
            </Form.Item>
        </Form>
    </Modal>
    </div>
  )
}

export default EditProfile
