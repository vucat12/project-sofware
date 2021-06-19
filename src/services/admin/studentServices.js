import axios from "axios"
import { includeAuthenHeader } from "../authen";
import { environment } from "../environment";

export const getListStudents = (filter) => {
    let data = Object.fromEntries(Object.entries(filter).filter(([_, option]) => !!option));
    return axios({
        method: `get`,
        url: `${environment}/api/student/search`, 
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res)
}

export const getStudentById = (id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/student/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

export const getStudentCourse = (semesterId, id) => {
    return axios({
        method: `get`,
        url: `${environment}/api/student/course/${id}?semester_id=${semesterId}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res =>res.data)
}