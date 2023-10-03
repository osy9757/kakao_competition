import { createSlice, configureStore } from "@reduxjs/toolkit";
export const loginSlice = createSlice({
  name: "loginState",
  initialState: { value: false },
  reducers: {
    login: (state, action) => {
      state.value = true;
    },
  },
});

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
