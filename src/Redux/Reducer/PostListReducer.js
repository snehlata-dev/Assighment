import { POST_LIST } from "../Types";
import { postData } from "../../Components/PostData";
const intialstate = {
  postList: postData,
};
const PostListReducer = (state = intialstate, action) => {
  switch (action.type) {
    case POST_LIST:
      return {
        ...state,
        postList: action.postList,
      };
    default:
      return state;
  }
};

export default PostListReducer;
