import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";

import FromeImgae from "./pages/FromImgae";
import FromText from "./pages/FromText";
import Place from "./pages/Place";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import FindPWD from "./pages/Findpwd";

import UserInfo from "./pages/Userinfo";
import LikePlaces from "./pages/LikePlaces";
import LikeUsers from "./pages/LikeUsers";
import PostReview from "./pages/PostReview";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* / 으로 접근하든 /main 으로 접근하든 홈으로 이동할 수 있게 설정 */}
          <Route path="/" element={<Navigate to="/main" replace />} />
          {/* 홈/메인 */}
          <Route path="/main" element={<Home />} />
          {/* 여행지 찾기 */}
          <Route path="/fromimage" element={<FromeImgae />} />
          <Route path="/fromtext" element={<FromText />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/postreview/:id" element={<PostReview />} />
          {/* 로그인 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lgin" element={<Login />} />
          <Route path="/findpwd" element={<FindPWD />} />
          {/* 마이페이지 */}
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/likeplaces" element={<LikePlaces />} />
          <Route path="/likeusers" element={<LikeUsers />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
