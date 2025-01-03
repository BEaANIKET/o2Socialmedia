import { createSlice } from '@reduxjs/toolkit';

const postSlices = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        likes: [],
    },
    reducers: {
        setPost(state, action) {
            const { type, payload } = action.payload;

            if (type === 'SET_POST') {
                state.posts = payload;
            } else if (type === 'ADD_POST') {
                state.posts = [...state.posts, ...payload];
            } else if (type === 'SET_LIKE') {
                const existingLike = state.likes.find((like) => like.id === payload.id);

                if (existingLike) {
                    existingLike.likeCount = payload.likeCount;
                    existingLike.isLiked = payload.isLiked;
                } else {
                    state.likes.push(payload);
                }
            }
        },
    },
});

export const { setPost } = postSlices.actions;
export default postSlices.reducer;
