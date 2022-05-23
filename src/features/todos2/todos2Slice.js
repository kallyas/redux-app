import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// array of todos, loading, error
const initialState = {
  todos2: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const fetchTodosAPI = async () => {
  const res = await fetch("https://dummyjson.com/todos");
  const { todos } = await res.json();
  return todos;
};

export const todoSlice = createSlice({
  name: "todos2",
  initialState,
  reducers: {
    reset: (state) => {
      state.todos2 = [];
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
      state.todos2 = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
  },
});

export const fetchTodos = createAsyncThunk(
  "todos2/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const todos = await fetchTodosAPI();
      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const { reset } = todoSlice.actions;

export const todosSelector = (state) => state.todos2;

export default todoSlice.reducer;
