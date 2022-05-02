import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    token: string;
    name: string;
    email: string;
    about_me: string;
    avatar: string | null;
    background: string | null;
    followersCount: number;
    followingCount: number;
    id: string;
}

interface IUserState {
    value: IUser | null;
}

const initialState: IUserState = {
    value: {
        token: "",
        name: "",
        email: "",
        about_me: "",
        avatar: "",
        background: "",
        followersCount: 0,
        followingCount: 0,
        id: "",
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
