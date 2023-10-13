import { useRef } from "react";
import { COMMENT } from "./Comment";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/types/redux";

export const COMMENTS = () => {
  // loginState
  const isLogin = useSelector<RootState>((state) => state.login.value);

  // textarea input selector
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  // 댓글 버튼 eventHandler
  const commentbtnHandler = () => {
    if (isLogin) {
      if (commentRef.current && commentRef.current.value !== "") {
        commentRef.current.value = "";
        // api 호출을 통한 댓글 post
      } else {
        window.alert("후기를 작성해주세요!");
      }
    } else {
      window.alert("로그인 후 사용하실 수 있습니다!");
    }
  };

  return (
    <div className="commtents_wrapper">
      <COMMENT />
      <h4 className="commenthead">Leave a comment</h4>
      <div className="comment_input">
        <p className="commentmessage">Message</p>
        <textarea
          ref={commentRef}
          onChange={(e) => {
            e.preventDefault();
          }}
          className="inputbox"
          maxLength={3000}
          placeholder="여행지 후기를 작성 댓글 입력창"
        />
        <button className="commentbtn" onClick={commentbtnHandler}>
          POST COMMENT
        </button>
      </div>
    </div>
  );
};
