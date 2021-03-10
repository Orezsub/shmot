import axios from 'axios'
import {API_URL} from "../config";

export const add = async (event, name, description, type, price, file) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('type', type);
    data.append('price', price);
    data.append('file', file ? file[0] : null);

    await axios.post(`${API_URL}api/add`, data, {});
}

export const view = async () => {
    return (await axios.get(`${API_URL}api/view`, {})).data.shmots;
}

export const editGet = async (id) => {
    return (await axios.get(`${API_URL}api/edit`,
        {headers:{ShmotId: id}}
        )).data.shmot;
}

export const editPost = async (event, shmotId, name, description, type, price, file) => {
    event.preventDefault();
    const data = new FormData();
    data.append('shmotId', shmotId);
    data.append('name', name);
    data.append('description', description);
    data.append('type', type);
    data.append('price', price);
    data.append('file', file ? file[0] : null);

    await axios.post(`${API_URL}api/edit`, data, {});
}

export const deleteShmot = async (event, shmotId) => {
    const data = new FormData();
    data.append('shmotId', shmotId);
    await axios.post(`${API_URL}api/del`, data, {}
    );

}
