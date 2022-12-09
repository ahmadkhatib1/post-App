import { configureStore } from "@reduxjs/toolkit";
import postReducer from './featuer/postSlice'
import userReducer from './featuer/userSlice'
const store = configureStore({
    reducer: {
        posts: postReducer,
        users: userReducer
    }
});
export default store