import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        fetchedUsers: [],
        isFetching: false,
        isError: false,
        error: null,
    },
    reducers: {
 
        fetchStart: (state) => {
            state.isError = false;
            state.isFetching = true;  
            state.error = null; 
        },
        fetchSuccess: (state, action) => {
            state.isFetching = false;
            state.fetchedUsers = action.payload;
            state.isError = false;
            state.error = null;

        },
        fetchFailed: (state, action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = action.payload;
            state.isError = true;
            
        },
        reserError: (state) => {
            state.isError = false;
            state.error = null;
        },
        clearUsers: (state) => {
            state.fetchedUsers = [];
            state.isFetching = false;
            state.isError = false;
            state.error = null;
        },

        updateUserRedux : (state, action) => {
            console.log("update user redux")
            state.fetchedUsers.forEach((value, index) => {
                if (value._id === action.payload._id) {
                    state.fetchedUsers[index] = action.payload;
                }
            })
        }
    }
})

export const {fetchStart, fetchFailed, fetchSuccess, reserError, clearUsers, updateUserRedux} = userSlice.actions;
export default userSlice.reducer;

