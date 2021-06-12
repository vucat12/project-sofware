import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getListCalendar = (filter) => {

    //will fix soon
        filter.fromDate = filter?.fromDate + 'T00:00:00.00Z';
        filter.toDate = filter?.toDate + 'T00:00:00.00Z';
    if(filter.class_name === '') delete filter.class_name;
    if(filter.course_name === '') delete filter.course_name;

    return axios({
        method: 'get',
        url: `${environment}/api/calendar/search`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: filter,
    }).then(res => res.data)
}

export const getCalendarById = (id) => {
    return axios({
        method: 'get',
        url: `${environment}/api/calendar/${id}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

export const getClassByShift = (data) => {
    return axios({
        method: 'get',
        url: `${environment}/api/calendar/shift`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
        params: data,
    }).then(res => res.data);
}