import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns"
const post_Url = 'https://jsonplaceholder.typicode.com/posts';
const initialState = {
    posts: [],
    status: 'idle',//=> 'idle' |'loading' | succeeded | failed
    error: null
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const res = await axios.get(post_Url);
        return [...res.data]
    } catch (error) {
        return error.massage
    }
})
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const res = await axios.post(post_Url, initialPost);
        return res.data;
    } catch (error) {
        return error.massage;
    }

})
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                //add data in reaction
                let min = 1;
                const loadedPost = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                //add any fetched posts to the array
                state.posts = state.posts.concat(loadedPost)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee : 0
                }
                state.posts.push(action.payload)
            })
    }
})
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer