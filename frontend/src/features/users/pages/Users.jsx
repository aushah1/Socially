import { useEffect, useState } from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";
import Loader from "../../shared/components/Loader";

const Users = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    loading: userLoading,
    handleFollow,
    handleUnFollow,
    users,
  } = useUser();

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

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <main>
        <LeftSidebar user={user} />
        <div className="right">
          <h2>People You May Know</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
          <div className="users">
            {users?.length > 0 ? (
              users.map((person) => {
                const status = getFollowStatus(person.username);
                return (
                  <div key={person._id} className="user-card">
                    <div className="avatar">
                      <img src={person.profileImage} alt="user" />
                    </div>
                    <div className="user-info">
                      <h4>{person.name}</h4>
                      <p>@{person.username}</p>
                    </div>

                    <button
                      className="btn"
                      onClick={() => {
                        if (status === "unfollow") {
                          handleUnFollow(person.username);
                        } else if (status === "follow") {
                          handleFollow(person.username);
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
              <p>No Users</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Users;
