import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getListCourse = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: 'get',
        url: `${environment}/api/public/course/search`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: {...data}
    }).then(res => res.data)
}

export const postNewCourse = (data) => {
    return axios({
        method: 'post',
        url: `${environment}/api/add-new-course`,
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