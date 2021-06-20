import { notification } from "antd";
import axios from "axios"
import { includeAuthenHeader } from "../authen";
import { environment } from "../environment";

export const getListLecturers = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/all`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const getDataLecturers = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/search`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const getLecturerById = (id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/${id}`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res)
}

export const getLecturerCourse = (semesterId, id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/course/${id}?semester_id=${semesterId}`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res)
}

export const postNewLecturer = (data) => {
    return axios({
        method: `post`,
        url: `${environment}/api/lecturer/create`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {...data}
    }).then(res => res)
}

export const updateLecturer = (id, full_name) => {
    return axios({
        method: 'put',
        url: `${environment}/api/lecturer/update/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {full_name: full_name}
    }).then(res => {
        notification.open({
            message: 'success notification',
            description: 'Update success',
            style: {
              width: 600,
            },
        });
    })
    .catch(err => {
        notification.open({
            message: 'Error notification',
            description: err.response.data.message,
            style: {
              width: 600,
            },
        });
    });
}