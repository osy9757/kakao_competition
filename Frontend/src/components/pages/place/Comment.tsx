export const COMMENT = () => {
  return (
    <div className="comment_wrapper">
      <p className="commentsnum">1 Comments</p>
      <div className="infowrapper">
        <div className="userthumnail">
          <img src="/ryan.png" alt="user thumbnail" className="thumnail" />
        </div>
        <div className="commentinfo">
          <div className="userinfo">
            <h3 className="username">user1</h3>
            <button className="deletebtn">삭제</button>
          </div>
          <p className="commenttime">MMMM DD, YYYY at HH:MM</p>
          <p className="comment">comment</p>
        </div>
      </div>
    </div>
  );
};
