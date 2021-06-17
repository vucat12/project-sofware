import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getStudentFee = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/student/fee/token`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

export const getStudentFeeTotal = async () => {
    let data;
    await axios({
        method: 'get',
        url: `${environment}/api/student/total-fee/token`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => data = res.data)
    return data.data;
}

export const postFeePayment = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/student/fee/payment/token`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: data,
    }).then(res => {
        notification.open({
            message: 'Success notification',
            description: 'Thanh toán thành công',
            style: {
              width: 600,
            },
          });
        return res;
    }).catch(err => {
        notification.open({
            message: 'Error notification',
            description: "Không nhập tiền mà đòi đóng học phí!",
            style: {
              width: 600,
            },
          });
    })
}

export const updateProfile = (data) => {
    return axios({
        method: 'put',
        url: `${environment}/api/student/update`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: data,
    }).then(res => {
        notification.open({
            message: 'Success notification',
            description: 'Chỉnh sửa thành công',
            style: {
              width: 600,
            },
          });
        return res;
    }).catch(err => {
        notification.open({
            message: 'Error notification',
            description: "Chỉnh sửa lỗi",
            style: {
              width: 600,
            },
          });
    })
}

export const getCalendarList = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/student/timetable/token`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}