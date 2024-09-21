import { publicreq } from "../../axiosReqMethods";
import { loginFailed, start, loginSuccess } from "../userRedux";
import { setError } from '../MessageRedux'


export const login = async (dispatch, user) => {
    const {email, password} = user;
    dispatch(start());
    try {
        const res = await publicreq.post("api/auth/login", {email, password, forAdmin: true});
        dispatch(loginSuccess(res?.data));
        
    } catch (error) {
        dispatch(loginFailed());
        dispatch(setError(error.response?.data.message))
    }
}
