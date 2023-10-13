const Subscribe = () => {
  const subsHandler = () => {};
  return (
    <div className="subs">
      <h2 className="subsinfo1">Lets you Explore the Best. Subscribe Us Now</h2>
      <p className="subsinfo2">
        (서비스 이름)을 구독해서 더 많은 정보를 얻으세요
      </p>
      <button onClick={subsHandler} className="subsbtn">
        Subscribe
      </button>
    </div>
  );
};

export default Subscribe;
