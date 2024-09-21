import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    announcements: [],
    error: null,
}

const announcementslice = createSlice({
    name: "announcements",
    initialState,
    reducers: {
        fetchannouncements: (state, action) => {
            state.announcements = action.payload;
        },
        addannouncements: (state, action) => {
            const todayDate = Date.now();
            const newAnnoucment = {...action.payload, createdAt: todayDate, updatedAt: todayDate}
            state.announcements = [...state.announcements, newAnnoucment];
        },
        removeAnnoucment: (state, action) => {
            state.announcements = state.announcements.filter(a => {
                return a._id !== action.payload;
            })
        },
        editAnnoucment: (state, action) => {
            state.announcements.forEach((a, index) => {
                if(a._id === action.payload._id) {
                    state.announcements[index] = action.payload;
                }
            })     
        },
        disableAllAnnoucments: (state,action) => {
            state.announcements.forEach(i => {
                i.active = false
            })
        }
    }
})

export const { addannouncements, fetchannouncements, removeAnnoucment, editAnnoucment, disableAllAnnoucments} = announcementslice.actions;
export default announcementslice.reducer;