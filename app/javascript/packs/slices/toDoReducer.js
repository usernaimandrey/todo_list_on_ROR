import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { produce } from 'immer';
import router from '../router';

const initialState = {
    ids: [],
    entities: {},
    activeFilter: 'all',
};

export const fetchGetData = createAsyncThunk(
  'todo/fetchGetData',
  async () => {
    const { data } = await axios.get(router.getData());
    return data;
  },
);

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async ({ text, state }) => {
    const { data } = await axios({
      method: 'post',
      url: router.create(),
      data: {
        text: text,
        state: state,
      }
  });
  return data;
  }
);

export const destroyTodo = createAsyncThunk(
  'totdo/destroyTodo',
  async (id)  => {
    await axios({
      method: 'delete',
      url: router.delete(id),
    });
    return id;
  }
);

export const updteTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({ id, state }) => {
    await axios.patch(router.update(id),
                      { edited_field: state, state },
                      { headers: { 'Content-Type': 'application/json' } }
                      );
    return { id, changes: { state } };
  }
);

const tasksAdapter = createEntityAdapter(); 

export const toDoSlice =  createSlice({
    name: 'todo',
    initialState,

    reducers: {
        addTask: tasksAdapter.addOne,
        removeTask: tasksAdapter.removeOne,
        changeState: tasksAdapter.updateOne,
        filtered: produce((draft, { payload: { filter } }) => {
            draft.activeFilter = filter;
        }),
    },


  extraReducers: (builder) => {
    builder
      .addCase(fetchGetData.fulfilled, (state, { payload }) => {
        tasksAdapter.setAll(state, payload);
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        tasksAdapter.addOne(state, payload);
      })
      .addCase(updteTodo.fulfilled, (state, { payload }) => {
        tasksAdapter.updateOne(state, payload);
      });
  },
});

export const selectors = tasksAdapter.getSelectors((state) => state.toDo);
export const { addTask, removeTask, changeState, filtered } = toDoSlice.actions;

export default toDoSlice.reducer;