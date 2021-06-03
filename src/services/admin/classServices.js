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