import { useEffect, useState } from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";

const Followers = () => {
  const { user, loading: authLoading } = useAuth();
  const { loading: userLoading, handleFollow, handleUnFollow } = useUser();

  const loading = authLoading || userLoading;

  const acceptedFollowers = user?.followers?.filter(
    (f) => f.status === "accepted",
  );

  if (loading) {
    return (
      <div className="following">
        <h2>Loading...</h2>
      </div>
    );
  }

  function getFollowStatus(username) {
    const relation = user.following.find(
      (f) => f.followee.username === username,
    );

    if (!relation) return "follow";
    if (relation.status === "pending") return "pending";
    if (relation.status === "accepted") return "unfollow";

    return "follow";
  }
  return (
    <>
      <main>
        <LeftSidebar user={user} />
        <div className="right">
          <h2>Followers</h2>
          <p>List of users who are following you will appear here.</p>
          <div className="users">
            {acceptedFollowers?.length > 0 ? (
              acceptedFollowers.map((followedUser) => {
                const status = getFollowStatus(followedUser.follower.username);
                return (
                  <div key={followedUser._id} className="user-card">
                    <div className="avatar">
                      <img
                        src={followedUser.follower.profileImage}
                        alt="user"
                      />
                    </div>
                    <div className="user-info">
                      <h4>{followedUser.follower.fullName}</h4>
                      <p>@{followedUser.follower.username}</p>
                    </div>

                    <button
                      className="btn"
                      onClick={() => {
                        if (status === "unfollow") {
                          handleUnFollow(followedUser.follower.username);
                        } else if (status === "follow") {
                          handleFollow(followedUser.follower.username);
                        }
                      }}
                      disabled={status === "pending"}>
                      {status === "pending"
                        ? "Pending"
                        : status === "unfollow"
                          ? "Unfollow"
                          : "Follow"}
                    </button>
                  </div>
                );
              })
            ) : (
              <p>You have no followers yet.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Followers;
