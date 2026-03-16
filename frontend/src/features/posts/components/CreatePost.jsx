import React, { useState, useRef } from "react";
import "../styles/createPost.scss";
import { UsePost } from "../hooks/usePost";
import Loader from "../../shared/components/Loader";

const CreatePost = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const { loading, handleCreatePost } = UsePost();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!content.trim() && !file) return;
    handleCreatePost(content, file);
    setContent("");
    setFile(null);
    setPreview(null);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setContent("");
    setFile(null);
    setPreview(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (loading) return <Loader />;

  return (
    <>
      {/* ── Inline trigger bar ── */}
      <section className="create-post">
        <div className="composer-trigger" onClick={() => setOpen(true)}>
          <img
            src={user?.profileImage}
            alt={user?.username || "avatar"}
            className="trigger-avatar"
          />
          <div className="trigger-input">
            What's on your mind, {user?.fullName?.split(" ")[0] || "there"}?
          </div>
          <div className="trigger-actions">
            <button
              className="trigger-pill"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}>
              <i className="ri-image-line" />
              <span>Photo</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Modal overlay ── */}
      {open && (
        <div className="composer-overlay" onClick={handleOverlayClick}>
          <div className="composer-modal">
            {/* Header */}
            <div className="modal-header">
              <img
                src={user?.profileImage}
                alt={user?.username}
                className="modal-avatar"
              />
              <div className="modal-user-info">
                <span className="modal-name">
                  {user?.fullName || user?.username || "User"}
                </span>
                <span className="modal-handle">@{user?.username}</span>
              </div>
              <button
                className="close-btn"
                onClick={handleClose}
                aria-label="Close">
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handlePost} encType="multipart/form-data">
              <div className="modal-body">
                <textarea
                  className="post-textarea"
                  placeholder="What do you want to talk about?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  autoFocus
                  maxLength={2200}
                />

                {/* Image preview */}
                {preview && (
                  <div className="image-preview-wrap">
                    <img
                      src={preview}
                      alt="preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={removeFile}
                      aria-label="Remove image">
                      <i className="ri-close-circle-fill" />
                    </button>
                  </div>
                )}

                {/* Char counter */}
                {content.length > 0 && (
                  <div
                    className={`char-count ${content.length > 2000 ? "near-limit" : ""}`}>
                    {content.length} / 2200
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <div className="footer-tools">
                  <label className="tool-btn" title="Add photo">
                    <i className="ri-image-add-line" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </label>
                  <button type="button" className="tool-btn" title="Add emoji">
                    <i className="ri-emotion-line" />
                  </button>
                  <button
                    type="button"
                    className="tool-btn"
                    title="Tag location">
                    <i className="ri-map-pin-line" />
                  </button>
                </div>

                <div className="footer-right">
                  {file && (
                    <span className="file-badge">
                      <i className="ri-image-line" />
                      {file.name.length > 16
                        ? file.name.slice(0, 14) + "…"
                        : file.name}
                    </span>
                  )}
                  <button
                    type="submit"
                    className="post-btn"
                    disabled={!content.trim() && !file}>
                    Post
                    <i className="ri-send-plane-fill" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
