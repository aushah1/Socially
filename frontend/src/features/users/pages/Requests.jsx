import { useEffect, useState } from "react";
import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";
import Loader from "../../shared/components/Loader";
const Requests = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    loading: userLoading,
    requests,
    handleGetRequests,
    handleAcceptFollowRequest,
    handleRejectFollowRequest,
  } = useUser();

  const loading = authLoading || userLoading;
  if (loading) {
    return (
        <Loader/>
    );
  }

  return (
    <main>
      <LeftSidebar user={user} />
      <div className="right">
        <h2>Following</h2>
        <p>List of users you are following will appear here.</p>
        <div className="users">
          {requests?.length > 0 ? (
            requests.map((request) => {
              return (
                <div key={request._id} className="user-card">
                  <div className="avatar">
                    <img src={request.follower.profileImage} alt="user" />
                  </div>
                  <div className="user-info">
                    <h4>{request.follower.fullName}</h4>
                    <p>@{request.follower.username}</p>
                  </div>

                  <div className="btns">
                    <button
                      className="btn"
                      onClick={() =>
                        handleAcceptFollowRequest(request.follower.username)
                      }>
                      Accept
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        handleRejectFollowRequest(request.follower.username)
                      }>
                      Reject
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>You are not following anyone yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Requests;
