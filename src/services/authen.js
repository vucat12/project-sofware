import axios from 'axios';
import { environment } from './environment';
import decode from 'jwt-decode';
import { notification } from 'antd';

export const LogInPage = (username, password) => {
    return axios({
        method: 'post',
        data: { 
            password: password,
            username: username,
        },
        url: `${environment}/api/auth/login`,
    }).then(res => {
        window.localStorage.setItem('access_token', res.data.access_token)
        return res;
    }).catch(err => {
        notification.open({
            message: 'Error notification',
            description: err.response.data.message,
            style: {
              width: 600,
            },
          });
    })
}

export const includeAuthenHeader = () => {
    const authen = localStorage.getItem('access_token');
    return 'Bearer ' + authen;
}

export const checkAuthenRole = () => {
    const authen = localStorage.getItem('access_token');
    if(authen) {
        const decoded = decode(authen);
        return decoded;
    }
    else return 0;
}

export const updatePasswordAuth = (data) => {
    return axios({
        method: 'put',
        url: `${environment}/api/auth/update-password`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        data: {...data},
    })
}

export const getInfoDashboard = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/dashboard`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    })
}