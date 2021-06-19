import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getListOpenCourse = (filter) => {
    return axios({
        method: 'get',
        url: `${environment}/api/open-course/search`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: filter,
    }).then(res => res.data)
}

export const postNewOpenCourse = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/open-course`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {...data}
    }).then(res=> {
        notification.open({
            message: 'Success notification',
            description: 'Delete Success',
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


export const deleteOpenCourseById = (id) => {
    return axios({
        method: 'delete',
        url: `${environment}/api/open-course/delete/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    })
    .then(res => {
        notification.open({
            message: 'Success notification',
            description: 'Delete Success',
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

export const updateOpenCourseById = (data) => {
    const {id, ...dataPost} = data;

    return axios({
        method: 'put',
        url: `${environment}/api/open-course/update/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: dataPost
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