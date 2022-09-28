import axios from "axios";
let url = "";

if (process.env.NODE_ENV === "production") {
  url = "https://travelknights.herokuapp.com/api";
} else {
  url = "http://localhost:5000/api";
}

export const fetchPosts = () => axios.get(url);
export const createUser = (user) => axios.post(`${url}/register`, user);
export const createUser2 = (user) => axios.post(`${url}/register2`, user);
export const getUser = (user) => axios.post(`${url}/login`, user);
export const getUser2 = (user) => axios.post(`${url}/login2`, user);
export const verifyEmail = (user) => axios.post(`${url}/verifyEmail`, user);
export const resetPasswordSent = (user) =>
  axios.post(`${url}/resetPasswordSent`, user);
export const resetPassword = (user) => axios.post(`${url}/resetPassword`, user);
export const addMemory = (trip) => axios.post(`${url}/addMemory`, trip);
export const updateMemory = (trip) => axios.post(`${url}/updateMemory`, trip);
export const deleteMemory = (trip) => axios.post(`${url}/deleteMemory`, trip);
export const getCurrentUser = (user) => axios.post(`${url}/getCurrentUser`);
