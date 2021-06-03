import axios from "axios"
import { includeAuthenHeader } from "../authen"
import { environment } from "../environment"
import { notification } from 'antd';

export const getListCalendar = (filter) => {

    //will fix soon
        filter.fromDate = filter?.fromDate + 'T00:00:00.00Z';
        filter.toDate = filter?.toDate + 'T00:00:00.00Z';
    
    return axios({
        method: 'get',
        url: `${environment}/api/calendar/search?fromDate=${filter?.fromDate}&toDate=${filter?.toDate}`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

export const getShift = () => {
    return axios({
        method: 'get',
        url: `${environment}/api/shift/all`,
        headers: {
            Authorization: includeAuthenHeader(),
        },
    }).then(res => res.data)
}

// export const postNewClass = (data) => {
//     return axios({
//         method: 'post',
//         url: `${environment}/api/add-new-class`,
//         headers: {
//             Authorization: includeAuthenHeader(),
//         },
//         data: {...data}
//     }).catch(err => {
//         notification.open({
//             message: 'Error notification',
//             description: err.response.data.message,
//             style: {
//               width: 600,
//             },
//           });
//     });
// }