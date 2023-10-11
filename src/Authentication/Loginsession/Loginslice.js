import { createSlice } from "@reduxjs/toolkit";
const userAuth = createSlice({
    name: 'userauth',
    initialState: {
        isLoggedin: localStorage.getItem('login') ? localStorage.getItem('login') : false
    },
    reducers: {
        login(state) {
            state.isLoggedin = localStorage.getItem('login')
        },
        logout(state) {
            state.isLoggedin = false
        }
    }
})
export const authAction = userAuth.actions;
export default userAuth;