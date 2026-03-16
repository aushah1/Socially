import React, { useEffect, useState } from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { getSavedPosts } from "../services/posts.api";
import Loader from "../../shared/components/Loader";
import { useAuth } from "../../auth/hooks/useAuth";

const Saved = () => {
  const [loading, setLoading] = useState(true);
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        setLoading(true);
        const data = await getSavedPosts();
        setSavedPosts(data.savedPosts || []);
      } catch (err) {
        setError(err?.message || "Could not fetch saved posts");
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="layout">
      <LeftSidebar user={user} />
      <section className="feed-center" style={{ padding: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h2>Saved Posts</h2>
          <p>Browse posts you saved for later.</p>
        </div>

        {error && <div style={{ color: "#ff6b6b" }}>{error}</div>}

        {savedPosts.length === 0 ? (
          <div style={{ color: "#ccc" }}>You have no saved posts yet.</div>
        ) : (
          <div
            className="posts"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {savedPosts.map((post) => (
              <div
                key={post._id}
                className="post"
                style={{
                  background: "#111",
                  borderRadius: "10px",
                  overflow: "hidden",
                  color: "#fff",
                }}>
                <div className="post-image">
                  <img
                    src={post.imageUrl}
                    alt="saved post"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "0.75rem" }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>
                    {post.caption || "No caption"}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", color: "#aaa" }}>
                    {post.likes || 0} likes • {post.commentCount || 0} comments
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Saved;
