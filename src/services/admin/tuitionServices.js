import { notification } from "antd";
import axios from "axios"
import { includeAuthenHeader } from "../authen";
import { environment } from "../environment";

export const getListTuitionPendings = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/tuition/pending/${filter.semester_id}`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const postTuitionPending = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/tuition/confirm/${data.id}?confirm=${data.status}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        notification.open({
            message: 'Success notification',
            description: 'Xác nhận/ Hủy bỏ thành công',
            style: {
              width: 600,
            },
          });
    }).catch(err => {
        notification.open({
            message: 'Error notification',
            description: err.response.data.message,
            style: {
              width: 600,
            },
          });
    });
}

export const getTuitionAllStudents = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/tuition/${filter.semester_id}`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const postTuitionStudent = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/tuition/payment/${data.semester_id}?student_id=${data.student_id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        notification.open({
            message: 'Success notification',
            description: 'Xác nhận/ Hủy bỏ thành công',
            style: {
              width: 600,
            },
          });
    }).catch(err => {
        notification.open({
            message: 'Error notification',
            description: err.response.data.message,
            style: {
              width: 600,
            },
          });
    });
}

export const getTuitionDetailStudent = (semester_id, student_id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/tuition/detail/${student_id}?semester_id=${semester_id}`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res)
}