import axios from "axios"
import { includeAuthenHeader } from "../authen";
import { environment } from "../environment";

export const getListLecturers = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/all`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const getDataLecturers = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/search`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const getLecturerById = (id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/${id}`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res)
}

export const getLecturerCourse = (semesterId, id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/lecturer/course/${id}?semester_id=${semesterId}`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res)
}