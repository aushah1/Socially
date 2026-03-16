import React, { useState } from "react";
import "../styles/feed.scss";

const Post = ({ post, user, onLike, onComment, onSave }) => {
  const [comment, setComment] = useState("");
  const [heartBurst, setHeartBurst] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = (postId) => {
    onLike(postId);
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleDoubleClick = () => {
    handleLike(post._id);
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 800);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await onComment(post._id, comment.trim());
    setComment("");
  };

  return (
    <div className="post" onDoubleClick={handleDoubleClick}>
      {/* Header */}
      <div className="post-header">
        <div className="post-user">
          <img
            src={user?.profileImage}
            alt={user?.username}
            className="post-profile-img"
          />
          <div className="post-user-info">
            <span className="post-username">{user?.username}</span>
            <span className="post-time">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Recently"}
            </span>
          </div>
        </div>
        <button className="post-more">
          <i className="ri-more-fill" />
        </button>
      </div>

      {/* Image with double-tap heart burst */}
      <div className="post-image-wrap">
        <img src={post.imageUrl} alt="post" className="post-image" />
        {heartBurst && (
          <div className="heart-burst">
            <i className="ri-heart-fill" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button
            className={`action-btn${post.isLiked ? " liked" : ""}`}
            onClick={() => handleLike(post._id)}
            aria-label="Like">
            <i className={post.isLiked ? "ri-heart-fill" : "ri-heart-line"} />
          </button>

          <button
            className="action-btn"
            aria-label="Comment"
            onClick={toggleComments}>
            <i className="ri-chat-1-line" />
          </button>

          <button className="action-btn" aria-label="Share">
            <i className="ri-send-plane-line" />
          </button>
        </div>

        <div className="post-actions-right">
          <button
            className={`action-btn${post.isSaved ? " liked" : ""}`}
            aria-label="Save"
            onClick={() => onSave(post._id)}>
            <i
              className={post.isSaved ? "ri-bookmark-fill" : "ri-bookmark-line"}
            />
          </button>
        </div>
      </div>

      {/* Likes */}
      <div className="post-likes">
        {Number(post.likes || 0).toLocaleString()} likes
      </div>

      {/* Caption */}
      <div className="post-caption">
        <span className="post-username">{user?.username}</span>
        <span className="post-caption-text">{post.caption}</span>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="post-comments">
          {post.comments && post.comments.length > 0 ? (
            <>
              {post.commentCount > 3 && (
                <button className="view-all-comments">
                  View all {post.commentCount} comments
                </button>
              )}
              <div className="comments-list">
                {post.comments.slice(0, 3).map((c) => (
                  <div key={c._id} className="comment-item">
                    <span className="comment-user">{c.user}</span>
                    <span className="comment-text">{c.comment}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="no-comments">Be the first to comment.</p>
          )}
        </div>
      )}

      {/* Comment input */}
      {showComments && (
        <form className="comment-form" onSubmit={handleAddComment}>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={300}
          />
          <button
            className="comment-submit"
            type="submit"
            disabled={!comment.trim()}>
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
