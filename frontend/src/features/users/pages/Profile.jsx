import React from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/user.scss";

const Profile = () => {
  const { user, loading } = useAuth();
  const posts = user?.posts || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <LeftSidebar user={user} />
      <div className="right profile-page" style={{ padding: "2rem" }}>
        <div
          className="profile-card"
          style={{
            width: "100%",
            marginBottom: "1rem",
            background: "#0f0f0f",
            padding: "1rem",
            borderRadius: "12px",
            color: "#fff",
          }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img
              src={user?.profileImage || "https://via.placeholder.com/96"}
              alt="profile"
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <h2 style={{ margin: 0 }}>{user?.fullName || "Your Name"}</h2>
              <p style={{ margin: "4px 0", color: "#aaa" }}>
                @{user?.username || "username"}
              </p>
              <p style={{ margin: 0, color: "#ccc" }}>
                {user?.bio || "No bio yet"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <strong>{posts.length}</strong>
              <p style={{ margin: 0, color: "#aaa" }}>Posts</p>
            </div>
            <div>
              <strong>{user?.followers?.length || 0}</strong>
              <p style={{ margin: 0, color: "#aaa" }}>Followers</p>
            </div>
            <div>
              <strong>{user?.following?.length || 0}</strong>
              <p style={{ margin: 0, color: "#aaa" }}>Following</p>
            </div>
          </div>
        </div>

        <div className="users" style={{ width: "100%" }}>
          <h3>Your Posts</h3>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="user-card"
                style={{
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  background: "#0f0f0f",
                  padding: "12px",
                  borderRadius: "10px",
                  marginBottom: "0.5rem",
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                  }}>
                  <img
                    src={post.imageUrl}
                    alt="post"
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: "#fff" }}>
                      {post.caption || "No caption"}
                    </p>
                    <p style={{ margin: "2px 0 0", color: "#ccc" }}>
                      {post.likes || 0} likes · {post.commentCount || 0}{" "}
                      comments
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
