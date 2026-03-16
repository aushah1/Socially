import React from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/user.scss";
import Loader from "../../shared/components/Loader";

const Profile = () => {
  const { user, loading } = useAuth();
  const posts = user?.posts || [];

  if (loading) return <Loader />;

  return (
    <main className="users">
      <LeftSidebar user={user} />
      <div className="page-content page-content--wide">
        {/* Profile hero */}
        <div className="profile-hero">
          <div className="profile-hero-avatar-wrap">
            <div className="profile-hero-ring" />
            <img
              src={user?.profileImage || "https://via.placeholder.com/96"}
              alt="profile"
              className="profile-hero-avatar"
            />
          </div>
          <div className="profile-hero-info">
            <h2 className="profile-hero-name">
              {user?.fullName || "Your Name"}
            </h2>
            <p className="profile-hero-handle">
              @{user?.username || "username"}
            </p>
            {user?.bio && <p className="profile-hero-bio">{user.bio}</p>}
          </div>
          <div className="profile-hero-stats">
            <div className="profile-stat">
              <span>{posts.length}</span>
              <p>Posts</p>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <span>{user?.followers?.length ?? 0}</span>
              <p>Followers</p>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <span>{user?.following?.length ?? 0}</span>
              <p>Following</p>
            </div>
          </div>
          <button className="edit-profile-btn">
            <i className="ri-edit-line" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Posts section */}
        <div className="profile-posts-section">
          <div className="section-heading">
            <i className="ri-grid-line" />
            <span>Your Posts</span>
          </div>

          {posts.length > 0 ? (
            <div className="profile-posts-grid">
              {posts.map((post) => (
                <div key={post._id} className="profile-post-card">
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="profile-post-img"
                  />
                  <div className="profile-post-overlay">
                    <span>
                      <i className="ri-heart-fill" />{" "}
                      {(post.likes || 0).toLocaleString()}
                    </span>
                    <span>
                      <i className="ri-chat-1-fill" /> {post.commentCount || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="ri-camera-line" />
              </div>
              <h4>No posts yet</h4>
              <p>When you share something, it'll appear here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
