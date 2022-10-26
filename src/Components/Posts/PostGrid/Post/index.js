import React from "react";
import moment from "moment";
const Post = ({ post }) => {
  return (
    <div className="post">
      <div>
        <img alt="post-image" src={post.image} />
      </div>
      <dl>
        <dt>
          <b>{post.name}</b>
        </dt>
        <dd>
          {post.description}
        </dd>
      </dl>

      <div>
        <b>Last Updated Date :{"  "} </b>
        {moment(post.dateLastEdited).format("LLL")}
        </div>
    </div>
  );
};

export default Post;
