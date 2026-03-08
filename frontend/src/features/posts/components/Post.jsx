import React from "react";
import "../styles/feed.scss";
const Post = ({ post, user, onLike }) => {
  const handleLike = (postId) => {
    onLike(postId);
  };

  return (
    <>
      <div className="post" onDoubleClick={() => handleLike(post._id)}>
        <div className="post-header">
          <div className="post-user">
            <img src={user.profileImage} alt="" className="post-profile-img" />
            <span className="post-username">{user.username}</span>
          </div>

          <div className="post-more">
            <i className="ri-more-fill"></i>
          </div>
        </div>

        <div className="post-image">
          <img src={post.imageUrl} alt="post" />
        </div>

        <div className="post-actions">
          <div className="post-actions-left">
            <button
              onClick={() => {
                handleLike(post._id);
              }}>
              <i
                className={
                  post.isLiked ? "ri-heart-3-fill liked" : "ri-heart-3-line"
                }></i>
            </button>

            <i className="ri-chat-3-line"></i>
            <i className="ri-send-plane-line"></i>
          </div>

          <div className="post-actions-right">
            <i className="ri-bookmark-line"></i>
          </div>
        </div>

        <div className="post-likes">{post.likes} likes</div>

        <div className="post-caption">
          <span className="post-username">{user.username}</span>
          <span className="post-caption-text">{post.caption}</span>
        </div>
      </div>
    </>
  );
};

export default Post;
