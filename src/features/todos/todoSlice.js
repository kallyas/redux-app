import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// array of todos, loading, error
const initialState = {
  todos: [],
  todo: {},
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const fetchTodosAPI = async () => {
  const res = await fetch("https://dummyjson.com/todos");
  const { todos } = await res.json();
  return todos;
};

const fetchTodoAPI = async (id) => {
  const res = await fetch(`https://dummyjson.com/todos/${id}`);
  const data = await res.json();
  return data;
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reset: (state) => {
      state.todos = [];
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  // three states: pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(fetchTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
  },
});

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const todos = await fetchTodosAPI();
      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchTodo = createAsyncThunk(
  "todos/fetchTodo",
  async (id, thunkAPI) => {
    try {
      const todo = await fetchTodoAPI(id);
      return todo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { reset } = todoSlice.actions;

export const todosSelector = (state) => state.todos;

export default todoSlice.reducer;
