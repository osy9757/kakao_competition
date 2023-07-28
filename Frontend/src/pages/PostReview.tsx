import { useParams } from "react-router-dom";

const PostReview = () => {
  const { id } = useParams();
  return <div>여행지리뷰 작성 QueryParam {id}</div>;
};

export default PostReview;
