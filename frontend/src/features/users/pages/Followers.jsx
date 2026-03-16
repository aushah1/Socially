import { useEffect, useState } from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";
import Loader from "../../shared/components/Loader";

const Followers = () => {
  const { user, loading: authLoading } = useAuth();
  const { loading: userLoading, handleFollow, handleUnFollow } = useUser();

  const loading = authLoading || userLoading;

  const acceptedFollowers = user?.followers?.filter(
    (f) => f.status === "accepted",
  );

  function getFollowStatus(username) {
    const relation = user.following.find(
      (f) => f.followee.username === username,
    );
    if (!relation) return "follow";
    if (relation.status === "pending") return "pending";
    if (relation.status === "accepted") return "unfollow";
    return "follow";
  }

  if (loading) return <Loader />;

  return (
    <main className="users">
      <LeftSidebar user={user} />

      <div className="page-content">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h2 className="page-title">Followers</h2>
            <p className="page-subtitle">
              {acceptedFollowers?.length > 0
                ? `${acceptedFollowers.length} people follow you`
                : "No followers yet"}
            </p>
          </div>
        </div>

        {/* User list */}
        <div className="user-list">
          {acceptedFollowers?.length > 0 ? (
            acceptedFollowers.map((f) => {
              const status = getFollowStatus(f.follower.username);
              return (
                <div key={f._id} className="user-card">
                  <img
                    src={f.follower.profileImage}
                    alt={f.follower.fullName}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <span className="user-name">{f.follower.fullName}</span>
                    <span className="user-handle">@{f.follower.username}</span>
                  </div>
                  <button
                    className={`follow-btn follow-btn--${status}`}
                    disabled={status === "pending"}
                    onClick={() => {
                      if (status === "unfollow")
                        handleUnFollow(f.follower.username);
                      else if (status === "follow")
                        handleFollow(f.follower.username);
                    }}>
                    {status === "pending" && <i className="ri-time-line" />}
                    {status === "unfollow" && (
                      <i className="ri-user-unfollow-line" />
                    )}
                    {status === "follow" && (
                      <i className="ri-user-follow-line" />
                    )}
                    <span>
                      {status === "pending"
                        ? "Pending"
                        : status === "unfollow"
                          ? "Unfollow"
                          : "Follow Back"}
                    </span>
                  </button>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="ri-group-line" />
              </div>
              <h4>No followers yet</h4>
              <p>When people follow you, they'll appear here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Followers;
