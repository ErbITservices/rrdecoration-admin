import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
    },
    reducers: {
        start: (state) => {
            state.isFetching = true;  
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailed: (state) => {
            state.isFetching = false;
            state.currentUser = null;
        },
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.clear();
        }
    }
})

export const {start, loginSuccess, loginFailed, reserError, logoutUser } = userSlice.actions;
export default userSlice.reducer;

