import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { QUERY_SINGLE_POST } from "../utils/queries";

import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../utils/mutations";

const UpdatePost = () => {
  const [updatePost, { error }] = useMutation(UPDATE_POST);
  const { postId } = useParams();
  const [postText, setPostText] = useState("");

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const post = data?.post || {};
  useEffect(() => {
    if (data) {
      setPostText(post.postText);
    }
  }, [data]);

  const handleFormSubmit = async () => {
    try {
      const { data } = await updatePost({
        variables: {
          postId,
          postText,
        },
      });
      window.location.assign("/me");
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    setPostText(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      {/* <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p> */}
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="postText"
            placeholder="Here's a new post..."
            value={postText}
            className="form-input w-100"
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button
            className="btn btn-primary btn-block py-3"
            type="submit"
            onClick={handleFormSubmit}
          >
            Update Post
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
