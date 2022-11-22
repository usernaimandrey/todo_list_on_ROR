import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from './toDoReducer.js';
import comentReducer from './comentReducer.js';

export default configureStore({
    reducer: {
        toDo: toDoReducer,
        comment: comentReducer,
    },
});