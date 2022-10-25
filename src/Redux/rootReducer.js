import { combineReducers } from "redux";
import PostListReducer from "./Reducer/PostListReducer";

const rootReducer = combineReducers({
  PostListReducer: PostListReducer,
});

export default rootReducer;
