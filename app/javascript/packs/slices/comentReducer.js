import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeTask } from './toDoReducer.js';
import router from '../router.js';
import { fetchGetData } from './toDoReducer.js';
import extractAuthToken from '../utils/extractAuthToken.js';

const commentAdapter = createEntityAdapter();
const initialState = commentAdapter.getInitialState();

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ text, todo_id }) => {
        const { data } = await axios({
            headers: extractAuthToken(),
            method: 'post',
            url: router.createComment(todo_id),
            data: {
              text,
            }
        });
        return data

    }
);


export const commentSlice = createSlice({
    name: 'comment',
    initialState,

    reducers: {
        addComment: commentAdapter.addOne,
        addComments: commentAdapter.addMany,
    },

    extraReducers: (builder) => {
        builder
        .addCase(removeTask, (state, { payload }) => {
            console.log(payload)
            const newEntities = Object.keys(state.entities)
            .reduce((acc, el) => {
                if (state.entities[el].todo_id !== payload) {
                    return { [el]: state.entities[el], ...acc };
                } else {
                    return acc;
                }
            }, {});
            commentAdapter.setAll(state, newEntities);
        })
        .addCase(createComment.fulfilled, (state, {payload}) => {
            commentAdapter.addOne(state, payload)
        })
        .addCase(fetchGetData.fulfilled, (state, { payload }) => {
            console.log(payload)
            payload.forEach(({ comments }) => {
                commentAdapter.addMany(state, comments)
            });
        });
    }
});

export const commentSelectors = commentAdapter.getSelectors((state) => state.comment);
export const { addComment, addComments } = commentSlice.actions;

export default commentSlice.reducer;