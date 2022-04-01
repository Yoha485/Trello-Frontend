import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "../../api/authApi";
import * as userApi from "../../api/userApi";

export const createUser = createAsyncThunk("user/create", async (data) => {
  const res = await authApi.createUser(data);
  return res.data;
});

export const loginUser = createAsyncThunk("user/login", async (data) => {
  const res = await authApi.loginUser(data);
  return res.data;
});

export const updateUser = createAsyncThunk("user/update", async (data) => {
  const res = await userApi.updateUser(data.userData, data.token);
  return res.data;
});

export const getUser = createAsyncThunk("user/get", async (token) => {
  const res = await userApi.getUser(token);
  const payload = {
    ...res.data,
    token: token,
  };
  return payload;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    formError: "",
  },
  reducers: {
    clearErrorMessage(state, action) {
      state.formError = "";
    },
    setUserFromLocalStorage(state, action) {
      state.user = action.payload;
    },
    clearUser(state, action) {
      state.user = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = "";
      })
      .addCase(createUser.pending, (state, action) => {
        state.formError = "";
      })
      .addCase(createUser.rejected, (state, { error }) => {
        if ((error.message = "Request failed with status code 409")) {
          state.formError = "Bad credentials";
        } else {
          state.formError = error.message;
        }
      });
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.formError = "";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.formError = "";
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.formError = "Bad credentials";
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.error);
      });
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(getUser.rejected, () => {
        localStorage.clear();
        location.reload();
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectFormError = (state) => state.user.formError;
export const { clearErrorMessage, setUserFromLocalStorage, clearUser } =
  userSlice.actions;

export default userSlice.reducer;
