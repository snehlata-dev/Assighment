import { POST_LIST } from "../Types";

export function PostListAction(postUpdatedList) {
  return {
    type: POST_LIST,
    postList: postUpdatedList,
  };
}


