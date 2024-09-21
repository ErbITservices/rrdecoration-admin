import { req } from "../../axiosReqMethods";
import {
  fetchStart,
  fetchFailed,
  fetchSuccess,
  reserError,
  updateUserRedux,
} from "../UseersComponentRedux";
import { setError } from '../MessageRedux'



export const fetchUsers = async (dispatch, querie) => {
  dispatch(fetchStart());
  try {  
    const users = await req.get(`/api/users/allinfo?${new URLSearchParams(querie)}`);
    dispatch(fetchSuccess(users?.data));
  } catch (error) { 
      dispatch(fetchFailed(error.response?.data));

    setTimeout(() => {
      dispatch(reserError());
    }, 5000);
  }
};

export const updateUser = async (dispatch, userID, data) => {
  try {
    const res = await req.put(`/api/users/${userID}`, data);
    dispatch(setError("user updated successfully"))
    dispatch(updateUserRedux(res?.data))
    return res;
  } catch (err) {
    dispatch(setError("user updated successfully"))
    console.log(`error is ${err}`);
  }
};
