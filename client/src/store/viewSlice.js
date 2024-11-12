import {createSlice} from '@reduxjs/toolkit';

const viewSlice=createSlice({
    name: 'view',
    initialState: {
        sidebar_status: 1,      // 1=friends, 2=pending requests, 3=global users, 4=group
    },

    reducers: {
        setSidebarStatus: (state, action) => ({...state, sidebar_status: action.payload.sidebar_status}),

        clearSidebarStatus : (state)=>{
            state.sidebar_status=1;  // back to friends
        }
    }
})

export const {setSidebarStatus, clearSidebarStatus}=viewSlice.actions;
export default viewSlice.reducer;