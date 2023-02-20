import React from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_POST } from "../../utils/mutations";

const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  const [removePost, { error }] = useMutation(REMOVE_POST);
  const showRemoveButton = window.location.href.includes("me");

  const handleDelete = async (postId) => {
    try {
      const { data } = await removePost({
        variables: {
          postId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${post.postAuthor}`}
                >
                  {post.postAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    made this post on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You made this post on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{post.postText}</p>
            </div>
            {showRemoveButton && (
              <button
                className="btn btn-primary btn-block btn-squared"
                onClick={() => handleDelete(`${post._id}`)}
              >
                Remove this post.
              </button>
            )}

            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
             Update this post.
            </Link> */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Join the discussion on this post.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
