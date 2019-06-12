import axios from 'axios';

const baseUrl = 'https://uade-seminario-2-tpo.herokuapp.com/api';

export const get = url => axios.get(`${baseUrl}${url}`);

export const post = (url, data) => axios.post(`${baseUrl}${url}`, data);
