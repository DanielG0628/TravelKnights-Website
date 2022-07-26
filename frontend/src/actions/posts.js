import * as api from '../api/index';

export const getUser = (user) => async (dispatch) => {
  try {
    console.log(user.verified);
    if (user.verified === true) {
      const { data } = await api.getUser(user);
      dispatch({ type: 'AUTH', payload: data });
    } else {
      const { data } = await api.getUser(user);
      dispatch({ type: 'AUTH', payload: data });
    }
  } catch (error) {
    // CARSON????
    if (user.password !== 'aaa') {
      dispatch({ type: 'AUTH', payload: error.response.data.message });
      console.log(error.response.data.message);
    }
    dispatch({ type: 'AUTH', payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

export const getUser2 = (user) => async (dispatch) => {
  try {
    if (user.verified === true) {
      const { data } = await api.getUser2(user);
      dispatch({ type: 'AUTH', payload: data });
    } else {
      const { data } = await api.getUser2(user);
      dispatch({ type: 'AUTH', payload: data });
    }
  } catch (error) {
    if (user.password !== 'aaa') {
      dispatch({ type: 'AUTH', payload: error.response.data.message });
      console.log(error.response.data.message);
    }
    dispatch({ type: 'AUTH', payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

export const getCurrentUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.getCurrentUser(user);
    dispatch({ type: 'AUTH', payload: data });
  } catch (error) {
    dispatch({ type: 'AUTH', payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

export const verifyEmail = (user) => async (dispatch) => {
  try {
    const { data } = await api.verifyEmail(user);
    dispatch({ type: 'AUTH', payload: data });
  } catch (error) {
    dispatch({ type: 'AUTH', payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};
export const resetPasswordSent = (user) => async (dispatch) => {
  try {
    const { data } = await api.resetPasswordSent(user);
    dispatch({ type: 'AUTH', payload: data });
  } catch (error) {
    dispatch({ type: 'AUTH', payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};
export const resetPassword = (user) => async (dispatch) => {
  try {
    const { data } = await api.resetPassword(user);
    dispatch({ type: 'AUTH', payload: data });
  } catch (error) {
    dispatch({ type: 'AUTH', payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    console.log(data);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createUser2 = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser2(user);
    console.log(data);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addMemory = (trip) => async (dispatch) => {
  try {
    const { data } = await api.addMemory(trip);
    console.log(data);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMemory = (trip) => async (dispatch) => {
  try {
    const { data } = await api.updateMemory(trip);
    console.log(data);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteMemory = (trip) => async (dispatch) => {
  try {
    const { data } = await api.deleteMemory(trip);
    console.log(data);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
