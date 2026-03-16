import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";
import Loader from "../../shared/components/Loader";

const Following = () => {
  const { user, loading: authLoading } = useAuth();
  const { loading: userLoading, handleUnFollow } = useUser();

  const loading = authLoading || userLoading;
  const acceptedFollowing = user?.following?.filter(
    (f) => f.status === "accepted",
  );

  if (loading) return <Loader />;

  return (
    <main className="users">
      <LeftSidebar user={user} />
      <div className="page-content">
        <div className="page-header">
          <div>
            <h2 className="page-title">Following</h2>
            <p className="page-subtitle">
              {acceptedFollowing?.length > 0
                ? `You follow ${acceptedFollowing.length} people`
                : "You're not following anyone yet"}
            </p>
          </div>
        </div>

        <div className="user-list">
          {acceptedFollowing?.length > 0 ? (
            acceptedFollowing.map((f) => (
              <div key={f._id} className="user-card">
                <img
                  src={f.followee.profileImage}
                  alt={f.followee.fullName}
                  className="user-avatar"
                />
                <div className="user-info">
                  <span className="user-name">{f.followee.fullName}</span>
                  <span className="user-handle">@{f.followee.username}</span>
                </div>
                <button
                  className="follow-btn follow-btn--unfollow"
                  onClick={() => handleUnFollow(f.followee.username)}>
                  <i className="ri-user-unfollow-line" />
                  <span>Unfollow</span>
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="ri-user-heart-line" />
              </div>
              <h4>Not following anyone</h4>
              <p>Explore users and start following people you like.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Following;
