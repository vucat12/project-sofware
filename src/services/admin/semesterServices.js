import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getListSemester = (filter) => {
    if(!filter) filter="OPEN"
    return axios({
        method: 'get',
        url: `${environment}/api/semester/search?status=${filter}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
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