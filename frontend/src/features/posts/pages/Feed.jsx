import React, { useEffect } from "react";
import "../styles/feed.scss";
import { UsePost } from "../hooks/usePost";
import Post from "../components/Post";
const Feed = () => {
  const { handleGetFeed, handleLikePost, loading, feed } = UsePost();
  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading) {
    return (
      <main>
        <h2>Loading Posts</h2>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="posts">
          {feed &&
            feed.map((post) => {
              return (
                <Post
                  key={post._id}
                  post={post}
                  user={post.user}
                  onLike={handleLikePost}
                />
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Feed;
