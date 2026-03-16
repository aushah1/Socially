import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/feed.scss";
import { UsePost } from "../hooks/usePost";
import Post from "../components/Post";
import { useAuth } from "../../auth/hooks/useAuth";
import LeftSidebar from "../../shared/components/LeftSidebar";
import Loader from "../../shared/components/Loader";
import CreatePost from "../components/CreatePost";
import { useUser } from "../../users/hooks/useUser";

const Feed = () => {
  const navigate = useNavigate();
  const {
    handleGetFeed,
    handleLikePost,
    handleAddComment,
    handleSavePost,
    loading,
    feed,
  } = UsePost();
  const { users, loading: userLoading } = useUser();
  const { user } = useAuth();

  const fetchFeed = async () => {
    try {
      await handleGetFeed();
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const randomUsers = [...users].sort(() => 0.5 - Math.random()).slice(0, 5);

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading || userLoading) return <Loader />;

  return (
    <main className="layout">
      {/* LEFT SIDEBAR */}
      <LeftSidebar user={user} />

      {/* CENTER FEED */}
      <section className="feed-center">
        <CreatePost user={user} />
        <div className="posts">
          {feed?.map((post) => (
            <Post
              key={post._id}
              post={post}
              user={post.user}
              onLike={handleLikePost}
              onComment={handleAddComment}
              onSave={handleSavePost}
            />
          ))}
        </div>
      </section>

      {/* RIGHT SIDEBAR */}
      <aside className="right-sidebar">
        {/* Profile card */}
        <div className="profile-card">
          <div className="profile-image-wrap">
            <div className="profile-ring" />
            <img
              src={user?.profileImage || null}
              alt={user?.fullName}
              className="profile-image"
            />
          </div>

          <h3>{user?.fullName || "Name"}</h3>
          <p className="profile-handle">@{user?.username || "username"}</p>

          <div className="profile-stats">
            <div className="stat-item">
              <span>{user?.following?.length ?? 0}</span>
              <p>Following</p>
            </div>
            <div className="stat-item">
              <span>{user?.followers?.length ?? 0}</span>
              <p>Followers</p>
            </div>
            <div className="stat-item">
              <span>{user?.posts?.length ?? 0}</span>
              <p>Posts</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        {user?.bio && (
          <div className="bio-card">
            <h5>Bio</h5>
            <p>{user.bio}</p>
          </div>
        )}

        {/* Suggested users */}
        <div className="suggested-card">
          <div className="suggested-header">
            <h5>Suggested for you</h5>
            <span>See all</span>
          </div>

          {randomUsers.map((user) => (
            <div className="suggested-user" key={user._id}>
              <div className="suggested-user-info">
                <img src={user.profileImage} alt="user" />
                <div>
                  <p className="suggested-name">User {user.fullName}</p>
                  <p className="suggested-handle">@user_{user.username}</p>
                </div>
              </div>
              <button className="follow-btn">Follow</button>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default Feed;
