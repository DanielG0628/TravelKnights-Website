import axios from 'axios';
let url = '';

if (process.env.NODE_ENV === 'production') {
  url = 'https://travelknights.herokuapp.com/api';
} else {
  url = 'http://localhost:5000/api';
}

export const fetchPosts = () => axios.get(url);
export const createUser = (user) => axios.post(`${url}/register`, user);
export const getUser = (user) => axios.post(`${url}/login`, user);
<<<<<<< HEAD
export const googUser = (user) => axios.post(`${url}/register`, user);
//export const googcreateUser = (user) => axios.post(`${url}/register`, user);
=======

// update
>>>>>>> ec0f7d370ad7df8f44c7f6cb3d36e64926036bec
