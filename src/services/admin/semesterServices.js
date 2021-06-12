import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getListSemester = (filter) => {

    return axios({
        method: 'get',
        url: `${environment}/api/semester/search`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: filter
    }).then(res => res.data)
}

export const postNewSemester = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/semester/add-new-semester`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {...data}
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

export const deleteSemesterById = (id) => {
    return axios({
        method: 'delete',
        url: `${environment}/api/semester/delete/${id}`,
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

export const updateSemesterById = (data) => {
    
    return axios({
        method: 'put',
        url: `${environment}/api/semester/update/${data.id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: data
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