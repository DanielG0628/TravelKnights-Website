import axios from 'axios';

const url = 'http://localhost:5000/api';

export const fetchPosts = () => axios.get(url);
export const createUser = (user) => axios.post(`${url}/register`, user);
export const getUser = (user) => axios.post(`${url}/login`, user);
<<<<<<< HEAD
=======

// update
>>>>>>> cd60ae61e11fa70bd6e08a3d8eeebebf8ff89b28
