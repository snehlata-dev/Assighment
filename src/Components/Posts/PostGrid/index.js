import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostListAction } from "../../../Redux/Actions/PostActions";
import { postData } from "../../PostData";
import Post from "./Post";
import "./PostGrid.css";
const PostGrid = ({ searchValue, sortValue }) => {
  const dispatch=useDispatch();
  const postList=useSelector((state)=>state.PostListReducer.postList);
  /**
   * Searching functionality based on name and Description from array List
   */
  useEffect(() => {
    if (searchValue !== "") {
      const filterPostData = postData.filter((post) => {
        return !!(
          post.name.includes(searchValue) ||
          post.description.includes(searchValue)
        );
      });
      dispatch(PostListAction(filterPostData))
    } else {
      dispatch(PostListAction(postData))
    }
  }, [searchValue]);

   /**
   * sorting functionality based on name and dateLastEdited from array List
   */
  useEffect(() => {
    const copyPostData = [...postData];
    if (sortValue?.value === "Sort By Name") {
      const filterPostData = copyPostData.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      dispatch(PostListAction(filterPostData))
    }
    if (sortValue?.value === "Sort By dateLastEdited") {
      const filterPostData = copyPostData.sort(
        (a, b) => new Date(b.dateLastEdited) - new Date(a.dateLastEdited)
      );
      dispatch(PostListAction(filterPostData))
    }
  }, [sortValue]);
  return (
    <div className="posts-container">
      {postList.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default PostGrid;
