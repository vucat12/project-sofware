import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getOpenCourseSearch = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/open-course/current/search`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

export const getMyOpenCourse = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/my-open-course/current/token`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

export const registerOpenCourse = (data) => {
    const customData = {
        list: data
    }

    return axios({
        method: 'post',
        url: `${environment}/api/open-course/current/register`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: customData,
    }).then(res => {
        notification.open({
        message: 'Success notification',
        description: 'Đăng ký thành công',
        style: {
          width: 600,
        },
      });})
    .catch(err => {
        notification.open({
            message: 'Error notification',
            description: err.response.data.message,
            style: {
              width: 600,
            },
          });
    })
}