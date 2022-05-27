import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: !!user,
  user: user ? user : null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const authLogin = async (userData) => {
  const res = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const resData = await res.json();
  if (!resData.access_token) {
    throw new Error(resData.message);
  }

  localStorage.setItem("user", JSON.stringify(resData.user));
  localStorage.setItem("access_token", resData.access_token);
  localStorage.setItem("refresh_token", resData.refresh_token);
  return resData;
};

const authLogout = () => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  fetch("http://localhost:5000/api/v1/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        fetch("http://localhost:5000/api/v1/auth/logout/refresh", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        })
          .then((res) => {
            if (res.status === 500) {
              localStorage.clear();
              // window.location.href = "/login";
            }
          })
          .catch((err) => {
            return err;
          });
      }
    })
    .catch((err) => {
      return err;
    });
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    }
    );
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    })
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { user } = await authLogin(userData);
      return user;
    } catch (error) {
      // console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authLogout();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { reset } = authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;
