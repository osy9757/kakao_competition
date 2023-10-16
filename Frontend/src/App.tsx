import React from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import Header from "./components/common/Header";

import Home from "./pages/Home";

import FromeImage from "./pages/FromImage";
import Place from "./pages/Place";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import FindPWD from "./pages/Findpwd";
import LoginHandler from "./pages/LoginHandler";

import UserInfo from "./pages/Userinfo";
import LikePlaces from "./pages/LikePlaces";
import LikeUsers from "./pages/LikeUsers";
import PostReview from "./pages/PostReview";

import Example from "./pages/Example";
import Footer from "./components/common/Footer";
import { store } from "./lib/redux/store";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header /> {/* Render the Header */}
          <div className="content">
            <Routes>
              {/* / 으로 접근하든 /main 으로 접근하든 홈으로 이동할 수 있게 설정 */}
              <Route path="/" element={<Navigate to="/main" replace />} />
              {/* 홈/메인 */}
              <Route path="/main" element={<Home />} />
              {/* 여행지 찾기 */}
              <Route path="/fromimage" element={<FromeImage />} />
              <Route path="/place/:placeName" element={<Place />} />
              <Route path="/postreview/:id" element={<PostReview />} />
              {/* 로그인 */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/findpwd" element={<FindPWD />} />
              <Route
                path="/login/oauth2/callback/kakao"
                element={<LoginHandler />}
              />
              {/* 마이페이지 */}
              <Route path="/userinfo" element={<UserInfo />} />
              {/* 컴포넌트 연습 페이지 */}
              <Route path="/example" element={<Example />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
