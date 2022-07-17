//import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';

import * as api from '../api/index';

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: 'POST', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const {data} = await api.createUser(user);
    dispatch({type: 'CREATE', payload: data });
  }catch(error) {
    console.log(error.message); //ERROR HERE
  }
};
