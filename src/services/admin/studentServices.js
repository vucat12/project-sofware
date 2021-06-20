import { notification } from "antd";
import axios from "axios"
import { includeAuthenHeader } from "../authen";
import { environment } from "../environment";

export const getListStudents = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/student/search`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const getStudentById = (id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/student/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

export const getStudentCourse = (semesterId, id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/student/course/${id}?semester_id=${semesterId}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res =>res.data)
}

export const postNewStudent = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/student/create`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {...data}
    }).then(res=> {
        notification.open({
            message: 'Success notification',
            description: 'Thêm sinh viên thành công',
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