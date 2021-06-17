import { Modal, Button, Input, Form, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import { getStudentFee, postFeePayment, updateProfile } from '../../../services/front-page/resolveFeeServices';
import './ResolveFee.scss';


const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
    

function ResolveFee() {
    const [informationUser, setInformationUser] = useState(checkAuthenRole());
    const [informationFee, setInformationFee] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    let data;

    const [form] = Form.useForm();
    const { confirm } = Modal;

    async function getStudentDetailFee() {
        const res = await getStudentFee();
        setInformationFee(res.data);
    }

    function handleInputValueMoney(value) {
        data = value
    }

    function resolveFee(event) {
        confirm({
            title: 'Thanh toán học phí?',
            content: <div><span>Thanh toán học phí học {event.semester} với số tiền <br/> (Bạn còn nợ {event.fee_debt})</span>
            <div>
            <InputNumber
                className="mt-2" 
                style={{width: '100%'}}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={handleInputValueMoney}
                />
            </div>
            </div>,
            onOk: async () => {
                const dataPayment = {
                    semesterId: event.semester_id,
                    totalFee: data,
                }

                await postFeePayment(dataPayment)
                data = null;
                getStudentDetailFee();
            },
            okText: "Thanh toán",
            cancelText: "Hủy bỏ",
          });

      
    }

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

    useEffect(() => {
        getStudentDetailFee();
    }, []);

  return (
    <div className="resolve-fee">
    <h3 className="resolve-fee-head pt-2">Thông tin học phí</h3>
    <div className="resolve-fee-title">
        <span>Thông tin sinh viên</span>
        <div className="resolve-fee-title__edit">
            <Button type="link" onClick={() => editProfile()}>Chỉnh sửa thông tin</Button>
        </div>
    </div>
    <div className="resolve-fee-table">
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

    <div>
    {informationFee.map(el => (
        <div className="resolve-fee-money pt-2">
            <div className="resolve-fee-title">Thông tin học phí {el.semester}</div>

            <div className="resolve-fee-money__table">
                <table style={{width: '100%'}}>
                    <tr>
                        <td>Số TC học phí đăng ký</td>
                        <td><strong>{el.credit_quantity}</strong></td>
                    </tr>
                    <tr>
                        <td>Môn đăng ký</td>
                        <td><strong>{el.course_register}</strong></td>
                    </tr>
                    <tr>
                        <td>Học phí</td>
                        <td><strong>{el.total_fee}</strong></td>
                    </tr>
                    <tr>
                        <td>Còn nợ</td>
                        <td><strong>{el.fee_debt}</strong></td>
                    </tr>
                    <tr>
                        <td>Số tiền đã đóng</td>
                        <td><strong>{el.fee_completed}</strong></td>
                    </tr>
                    <tr>
                        <td>Thời gian đóng</td>
                        <td>Từ ngày: <strong>{moment(el.from_date).format("DD/MM/YYYY")}</strong> đến ngày: <strong>{moment(el.to_date).format("DD/MM/YYYY")}</strong></td>
                    </tr>
                    <tr>
                        <td>Trạng thái</td>
                        <td>
                            {el.fee_status !== "Chưa Hoàn Thành" 
                            ? <strong>{el.fee_status}</strong>
                            : <Button type="primary" onClick={() => resolveFee(el)}>Thanh toán</Button>
                            }
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    ))}
    </div>
    <Modal 
    forceRender
    centered
    title="Basic Modal" 
    visible={isVisible} 
    onOk={confirmUpdateStudent} 
    onCancel={() => setIsVisible(false)}>
        <Form className="resolve-fee-modal" form={form} name="dynamic_rule">
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

export default ResolveFee
