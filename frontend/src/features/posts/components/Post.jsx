import React, { useState } from "react";
import "../styles/feed.scss";
const Post = ({ post, user, onLike, onComment }) => {
  const [comment, setComment] = useState("");

  const handleLike = (postId) => {
    onLike(postId);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await onComment(post._id, comment.trim());
    setComment("");
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

        <div className="post-comments">
          <div className="comment-count">{post.commentCount || 0} comments</div>
          {post.comments && post.comments.length > 0 ? (
            <div className="comments-list">
              {post.comments.slice(0, 3).map((c) => (
                <div key={c._id} className="comment-item">
                  <span className="comment-user">{c.user}</span>
                  <span className="comment-text">{c.comment}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-comments">No comments yet.</div>
          )}
        </div>

        <form className="comment-form" onSubmit={handleAddComment}>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="comment-submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
