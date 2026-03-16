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
    handleAcceptFollowRequest,
    handleRejectFollowRequest,
  } = useUser();

  const loading = authLoading || userLoading;
  if (loading) return <Loader />;

  return (
    <main className="users">
      <LeftSidebar user={user} />
      <div className="page-content">
        <div className="page-header">
          <div>
            <h2 className="page-title">Requests</h2>
            <p className="page-subtitle">
              {requests?.length > 0
                ? `${requests.length} pending follow request${requests.length !== 1 ? "s" : ""}`
                : "No pending requests"}
            </p>
          </div>
          {requests?.length > 0 && (
            <div className="page-badge">{requests.length}</div>
          )}
        </div>

        <div className="user-list">
          {requests?.length > 0 ? (
            requests.map((req) => (
              <div key={req._id} className="user-card">
                <img
                  src={req.follower.profileImage}
                  alt={req.follower.fullName}
                  className="user-avatar"
                />
                <div className="user-info">
                  <span className="user-name">{req.follower.fullName}</span>
                  <span className="user-handle">@{req.follower.username}</span>
                </div>
                <div className="request-actions">
                  <button
                    className="follow-btn follow-btn--follow"
                    onClick={() =>
                      handleAcceptFollowRequest(req.follower.username)
                    }>
                    <i className="ri-check-line" />
                    <span>Accept</span>
                  </button>
                  <button
                    className="follow-btn follow-btn--reject"
                    onClick={() =>
                      handleRejectFollowRequest(req.follower.username)
                    }>
                    <i className="ri-close-line" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="ri-notification-2-line" />
              </div>
              <h4>No pending requests</h4>
              <p>When someone requests to follow you, it'll show up here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Requests;
