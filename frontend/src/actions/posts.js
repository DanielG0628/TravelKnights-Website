import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  AUTH,
  LOGOUT,
} from "../constants/actionTypes";

import * as api from "../api/index";

export const getUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.getUser(user);
    //console.log(error.message);
    dispatch({ type: "AUTH", payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: "AUTH", payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message); //ERROR HERE
  }
};
