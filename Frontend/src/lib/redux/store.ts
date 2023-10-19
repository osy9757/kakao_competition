import {
  createSlice,
  configureStore,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storageSession from "redux-persist/lib/storage/session";

export const loginSlice = createSlice({
  name: "loginState",
  initialState: { value: false },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const kakaoSlice = createSlice({
  name: "kakaoState",
  initialState: { value: false },
  reducers: {
    kakaologin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const kakaoAccess = createSlice({
  name: "kakaoAccess",
  initialState: { value: "" },
  reducers: {
    getToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export const { kakaologin } = kakaoSlice.actions; // kakaoSlice에서의 액션도 내보내줍니다.

// export const store = configureStore({
//   reducer: {
//     login: loginSlice.reducer,
//     kakao: kakaoSlice.reducer,
//     kakaoAccess: kakaoAccess.reducer, // kakaoState를 저장소에 추가합니다.
//   },
// });

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["login"],
};

// 이 부분에서 combineReducers를 사용해 리듀서들을 결합합니다.
const combinedReducer = combineReducers({
  login: loginSlice.reducer,
  kakao: kakaoSlice.reducer,
  kakaoAccess: kakaoAccess.reducer,
});

// 여기서 persistedReducer에 combinedReducer를 전달합니다.
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
