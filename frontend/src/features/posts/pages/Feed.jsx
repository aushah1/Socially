import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/feed.scss";
import { UsePost } from "../hooks/usePost";
import Post from "../components/Post";
const Feed = () => {
  const navigate = useNavigate();
  const { handleGetFeed, handleLikePost, loading, feed } = UsePost();
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
        <aside className="left-sidebar">
          <div className="logo">
            <img src="/logo.png" alt="logo" />
            <h5>BrandName</h5>
          </div>
          <div className="tabs">
            <nav>
              <div className="nav-item active">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"></path>
                </svg>
                <h5>Following</h5>
              </div>
              <div className="nav-item">
                {" "}
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"></path>
                </svg>
                <h5>Followers</h5>
              </div>
              <div className="nav-item">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"></path>
                </svg>
                <h5>Requests</h5>
              </div>
              <div className="nav-item">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"></path>
                </svg>
                <h5>Users</h5>
              </div>
            </nav>
            <div className="bottom">
              <img
                src="https://i.pravatar.cc/150"
                className="profile-image-bottom"
              />
              <div className="info">
                <h4>Alex Rivera</h4>
                <p>@arivera</p>
              </div>
            </div>
          </div>
        </aside>

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
            <img src="https://i.pravatar.cc/150" className="profile-image" />

            <h3>Alex Rivera</h3>
            <p>@arivera</p>

            <div className="profile-stats">
              <div>
                <span>200</span>
                <p>Following</p>
              </div>

              <div>
                <span>100</span>
                <p>Followers</p>
              </div>

              <div>
                <span>20</span>
                <p>Posts</p>
              </div>
            </div>
          </div>
          <div className="bio">
            <h5>Bio</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus reiciendis at ex voluptate minima deleniti quidem et
              nihil blanditiis cupiditate.
            </p>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Feed;
