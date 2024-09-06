import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import getUserHome from '@/utils/getUserHome';
const initialState = {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    token: Cookies.get("token") ? Cookies.get("token") : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            action.payload.user.home = getUserHome(action.payload.user)
            state.user = action.payload.user;
            state.token = action.payload.token;
            Cookies.set("user", JSON.stringify(action.payload.user));
            Cookies.set("token", action.payload.token);

        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("user");
            Cookies.remove("token");

        },
    },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer