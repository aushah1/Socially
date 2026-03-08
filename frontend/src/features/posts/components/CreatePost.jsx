import React, { useState } from "react";
import "../styles/createPost.scss";
import { UsePost } from "../hooks/usePost";
import Loader from "../../shared/components/Loader"
const CreatePost = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const { loading, handleCreatePost } = UsePost();

  if (loading) {
    return <Loader />;
  }

  const handlePost = (e) => {
    e.preventDefault();
    if (!content && !file) return;
    handleCreatePost(content, file);

    setContent("");
    setFile(null);
    setOpen(false);
  };

  return (
    <>
      {/* Small Composer */}
      <section className="create-post">
        <div className="composer-trigger">
          <img src={user?.profileImage} alt="avatar" />

          <div className="trigger-input" onClick={() => setOpen(true)}>
            What's on your mind?
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {open && (
        <div className="composer-overlay">
          <div className="composer-modal">
            {/* Header */}
            <div className="modal-header">
              <div className="user-info">
                <img src={user?.profileImage} alt="avatar" />
                <span>{user?.name}</span>
              </div>

              <button className="close-btn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            {/* Textarea */}
            <form
              onSubmit={handlePost}
              encType="multipart/form-data"
              method="post">
              <textarea
                placeholder="What do you want to talk about?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {/* Footer */}
              <div className="modal-footer">
                <label className="media-upload">
                  <i class="ri-image-add-fill"></i>
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {file && <span className="file-name">{file.name}</span>}
                </label>

                <input className="post-btn" type="submit" value="Post" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
