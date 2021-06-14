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

