import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import "./PostTable.css";

const PostTable = () => {
  
  const postList = useSelector((state) => state.PostListReducer.postList);

  return (
    <div>
      <table>
        <tr>
          <th>Image Link</th>
          <th>Name</th>
          <th>description</th>
          <th>Last Edit Date</th>
        </tr>
        {postList.map((post) => {
          return (
            <tr>
              <td>
                <a href={post.image} target="_blank">
                  Image
                </a>
              </td>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>{moment(post.dateLastEdited).format("LLL")}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default PostTable;
