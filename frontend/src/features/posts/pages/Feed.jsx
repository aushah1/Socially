import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/feed.scss";
import { UsePost } from "../hooks/usePost";
import Post from "../components/Post";
import { useAuth } from "../../auth/hooks/useAuth";
import LeftSidebar from "../../shared/components/LeftSidebar";
const Feed = () => {
  const navigate = useNavigate();
  const { handleGetFeed, handleLikePost, loading, feed } = UsePost();
  const { user } = useAuth();
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        await handleGetFeed();
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchFeed();
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
      <main className="layout">
        {/* LEFT SIDEBAR */}
        <LeftSidebar user={user} />

        {/* CENTER FEED */}
        <section className="feed-center">
          <div className="posts">
            {feed &&
              feed.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  user={post.user}
                  onLike={handleLikePost}
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

//<i className="ri-user-line"></i> users
//<i className="ri-team-line"></i> following
// <i className="ri-group-line"></i> followers
//<i className="ri-notification-2-line"></i> requests
// <i className="ri-home-5-fill"></i>  dashboard
