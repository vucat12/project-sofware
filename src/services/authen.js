import axios from 'axios';
import { environment } from './environment';
import decode from 'jwt-decode';

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
        return decoded.role;
    }
    else {
        return 0;
    }
   
}