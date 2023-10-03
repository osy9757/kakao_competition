import { createSlice, configureStore } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginState",
  initialState: { value: false },
  reducers: {
    login: (state, action) => {
      state.value = true;
    },
    logout: (state, action) => {
      state.value = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
