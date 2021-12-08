import { Modal, Button, InputNumber } from 'antd';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { checkAuthenRole } from '../../../services/authen';
import { getStudentFee, postFeePayment } from '../../../services/front-page/resolveFeeServices';
import './ResolveFee.scss';


function ResolveFee() {
    const informationUser = checkAuthenRole();
    const [informationFee, setInformationFee] = useState([]);

    let data;

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
            content: <div><span>Thanh toán học phí học {event.semester} với số tiền <br /> (Bạn còn nợ {event.fee_debt})</span>
                <div>
                    <InputNumber
                        className="mt-2"
                        style={{ width: '100%' }}
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

    useEffect(() => {
        getStudentDetailFee();
    }, []);

    return (
        <div className="resolve-fee">
            <h3 className="resolve-fee-head pt-2">Thông tin học phí</h3>
            <div className="resolve-fee-title">
                <span>Thông tin sinh viên</span>
            </div>
            <div className="resolve-fee-table">
                <table style={{ width: '100%' }}>
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
                        <div className="resolve-fee-title">Thông tin học phí {el.semester} từ {moment(el.from_date).format("DD/MM/YYYY")} - {moment(el.to_date).format("DD/MM/YYYY")}</div>
                        <div className="resolve-fee-money__table">
                            <table style={{ width: '100%' }}>
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
                                    <td>Thời gian hoàn thành</td>
                                    <td>{el.time_completed === undefined ? "Chưa Hoàn Thành" : <strong>{moment(el.time_completed).format("DD/MM/YYYY")}</strong>} </td>
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
        </div>
    )
}

export default ResolveFee
