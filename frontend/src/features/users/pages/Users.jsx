import { useEffect, useState } from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";

const Users = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    loading: userLoading,
    handleFollow,
    handleUnFollow,
    users,
  } = useUser();

  const loading = authLoading || userLoading;

  if (loading) {
    return (
      <div className="following">
        <h2>Loading...</h2>
      </div>
    );
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
                const isFollowing = user.following.some(
                  (f) => f.followee.username === person.username,
                );
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
                      onClick={() =>
                        isFollowing
                          ? handleUnFollow(person.username)
                          : handleFollow(person.username)
                      }>
                      {isFollowing ? "Unfollow" : "Follow"}
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
