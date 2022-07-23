import axios from 'axios';

const url = 'https://www.travelknightsucf.tk:5000/api';

export const fetchPosts = () => axios.get(url);
export const createUser = (user) => axios.post(`${url}/register`, user);
export const getUser = (user) => axios.post(`${url}/login`, user);
export const googUser = (user) => axios.post(`${url}/register`, user);
