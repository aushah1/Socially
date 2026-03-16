import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";
import Loader from "../../shared/components/Loader";
import { useState } from "react";

const Users = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    loading: userLoading,
    handleFollow,
    handleUnFollow,
    users,
  } = useUser();
  const [search, setSearch] = useState("");

  const loading = authLoading || userLoading;

  function getFollowStatus(username) {
    const relation = user.following.find(
      (f) => f.followee.username === username,
    );
    if (!relation) return "follow";
    if (relation.status === "pending") return "pending";
    if (relation.status === "accepted") return "unfollow";
    return "follow";
  }

  const filtered = users?.filter(
    (p) =>
      p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      p.username?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Loader />;

  return (
    <main className="users">
      <LeftSidebar user={user} />
      <div className="page-content">
        <div className="page-header">
          <div>
            <h2 className="page-title">Explore People</h2>
            <p className="page-subtitle">
              {filtered?.length > 0
                ? `${filtered.length} people to discover`
                : "No users found"}
            </p>
          </div>
          <div className="page-search">
            <i className="ri-search-line" />
            <input
              type="text"
              className="search-input"
              placeholder="Search people…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="user-list">
          {filtered?.length > 0 ? (
            filtered.map((person) => {
              const status = getFollowStatus(person.username);
              return (
                <div key={person._id} className="user-card">
                  <img
                    src={person.profileImage}
                    alt={person.fullName}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="user-name">{person.fullName}</span>
                    <span className="user-handle">@{person.username}</span>
                  </div>
                  <button
                    className={`follow-btn follow-btn--${status}`}
                    disabled={status === "pending"}
                    onClick={() => {
                      if (status === "unfollow")
                        handleUnFollow(person.username);
                      else if (status === "follow")
                        handleFollow(person.username);
                    }}>
                    {status === "follow" && <i className="ri-user-add-line" />}
                    {status === "unfollow" && (
                      <i className="ri-user-unfollow-line" />
                    )}
                    {status === "pending" && <i className="ri-time-line" />}
                    <span>
                      {status === "follow"
                        ? "Follow"
                        : status === "unfollow"
                          ? "Unfollow"
                          : "Pending"}
                    </span>
                  </button>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="ri-user-search-line" />
              </div>
              <h4>No users found</h4>
              <p>Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Users;
