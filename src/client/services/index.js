import axios from 'axios';

const baseUrl = process.env.API_URI || 'https://shart-online.herokuapp.com/api';

export const get = (url, data) => axios.get(`${baseUrl}${url}`, { params: data });

export const post = (url, data) => axios.post(`${baseUrl}${url}`, data);

export const put = (url, data) => axios.put(`${baseUrl}${url}`, data);

export const del = (url, data) => axios.delete(`${baseUrl}${url}`, data);
