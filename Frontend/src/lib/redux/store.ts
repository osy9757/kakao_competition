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

export const kakaoSlice = createSlice({
  name: "kakaoState",
  initialState: { value: false },
  reducers: {
    kakaologin: (state, action) => {
      state.value = true;
    },
    kakaologout: (state, action) => {
      state.value = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export const { kakaologin, kakaologout } = kakaoSlice.actions; // kakaoSlice에서의 액션도 내보내줍니다.

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    kakao: kakaoSlice.reducer, // kakaoState를 저장소에 추가합니다.
  },
});
