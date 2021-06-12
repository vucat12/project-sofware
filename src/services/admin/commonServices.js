import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"

export const getShift = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/shift/all`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        document.cookie =`getShift=${JSON.stringify(res.data.data)}`

        return res.data.data;
        
    });
}

export const getClass = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/class/all`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        document.cookie =`getClass=${JSON.stringify(res.data.data)}`
    });
}

export const getCourse = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/course/all`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        document.cookie = `getCourse=${JSON.stringify(res.data.data)}`
    });
}

export const getLecturer = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/lecturer/all`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        document.cookie = `getLecturer=${JSON.stringify(res.data.data)}`
    });
}

export const getSemester = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/semester/all`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => {
        document.cookie = `getSemester=${JSON.stringify(res.data.data)}`
    });
}

export const read_cookie = (name) => {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}
