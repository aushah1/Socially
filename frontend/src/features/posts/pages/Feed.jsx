import React, { use, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/feed.scss";
import { UsePost } from "../hooks/usePost";
import Post from "../components/Post";
import { useAuth } from "../../auth/hooks/useAuth";
import LeftSidebar from "../../shared/components/LeftSidebar";
import Loader from "../../shared/components/Loader";
import CreatePost from "../components/CreatePost";
const Feed = () => {
  const navigate = useNavigate();
  const { handleGetFeed, handleLikePost, handleAddComment, loading, feed } = UsePost();
  const { user } = useAuth();
  const fetchFeed = async () => {
    try {
      await handleGetFeed();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="layout">
        {/* LEFT SIDEBAR */}
        <LeftSidebar user={user} />

        {/* CENTER FEED */}
        <section className="feed-center">
          <CreatePost user={user} />
          <div className="posts">
            {feed &&
              feed.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  user={post.user}
                  onLike={handleLikePost}
                  onComment={handleAddComment}
                />
              ))}
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <img src={user?.profileImage || null} className="profile-image" />

            <h3>{user?.fullName || "Name"}</h3>
            <p>{user?.username || "username"}</p>

            <div className="profile-stats">
              <div>
                <span>{user?.following?.length || "0"}</span>
                <p>Following</p>
              </div>

              <div>
                <span>{user?.followers?.length || "0"}</span>
                <p>Followers</p>
              </div>

              <div>
                <span>{user?.posts?.length || "0"}</span>
                <p>Posts</p>
              </div>
            </div>
          </div>
          <div className="bio">
            <h5>Bio</h5>
            <p>{user?.bio || "bio"}</p>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Feed;
