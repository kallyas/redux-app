import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todoSlice';
import todos2Reducer from '../features/todos2/todos2Slice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    todos2: todos2Reducer,
  },
});
