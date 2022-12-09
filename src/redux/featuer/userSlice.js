import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USER_URL = 'https://jsonplaceholder.typicode.com/users'
const initialState = []
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    try {
        const res = await axios.get(USER_URL);
        return [...res.data];
    } catch (error) {
        return error.massage
    }
})
const userSlice = createSlice
    ({
        name: 'user',
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(fetchUser.fulfilled, (state, action) => {
                    return action.payload
                })
        }

    })
export const selectAllUsers = (state) => state.users

export default userSlice.reducer