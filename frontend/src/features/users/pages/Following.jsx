import LeftSidebar from "../../shared/components/LeftSidebar";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import "../styles/user.scss";

const Following = () => {
  const { user, loading: authLoading } = useAuth();
  const { loading: userLoading, handleUnFollow } = useUser();

  const loading = authLoading || userLoading;

  const acceptedFollowing = user?.following?.filter(
    (f) => f.status === "accepted",
  );
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
        <div className="right following">
          <h2>Following</h2>
          <p>List of users you are following will appear here.</p>
          <div className="users">
            {acceptedFollowing?.length > 0 ? (
              acceptedFollowing.map((followedUser, idx) => (
                <div key={idx} className="user-card">
                  <div className="avatar">
                    <img src={followedUser.followee.profileImage} alt="user" />
                  </div>
                  <div className="user-info">
                    <h4>{followedUser.followee.fullName}</h4>
                    <p>@{followedUser.followee.username}</p>
                  </div>

                  <button
                    className="btn"
                    onClick={() =>
                      handleUnFollow(followedUser.followee.username)
                    }>
                    Unfollow
                  </button>
                </div>
              ))
            ) : (
              <p>You are not following anyone yet.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Following;
