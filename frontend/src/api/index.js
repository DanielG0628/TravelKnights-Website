import axios from "axios";

const url = "http://localhost:5000/api";

export const fetchPosts = () => axios.get(url);
export const createUser = (user) => axios.post(`${url}/register`, user);
export const getUser = (user) => axios.get(`${url}/login`, user);
