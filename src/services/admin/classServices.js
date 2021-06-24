import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getListClass = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: 'get',
        url: `${environment}/api/class/search`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: {...data}
    }).then(res => res.data)
}

export const postNewClass = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/add-new-class`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {...data}
    }).then(res => {
        notification.open({
            message: 'Success notification',
            description: 'Thêm mới thành công',
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

export const deleteClassById = (id) => {
    return axios({
        method: 'delete',
        url: `${environment}/api/class/delete/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        notification.open({
            message: 'Success notification',
            description: 'Delete success',
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

export const updateClassById = (data) => {
    const {id, ...dataUpdate} = data;
    return axios({
        method: 'put',
        url: `${environment}/api/class/update/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {...dataUpdate}
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