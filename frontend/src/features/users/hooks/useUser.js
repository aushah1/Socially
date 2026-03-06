import { useContext, useEffect } from "react";
import { UserContext } from "../user.context";
import {
  follow,
  unFollow,
  getRequests,
  acceptFollowRequest,
  rejectFollowRequest,
  getAllUsers,
} from "../services/user.api";
import { useAuth } from "../../auth/hooks/useAuth";

export function useUser() {
  const { user, setUser } = useAuth();

  const context = useContext(UserContext);
  const { loading, setLoading, requests, setRequests, users, setUsers } =
    context;

  const handleFollow = async (username) => {
    try {
      setLoading(true);
      const response = await follow(username);
      return response.data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleUnFollow = async (username) => {
    try {
      setLoading(true);
      const response = await unFollow(username);
      setUser((prev) => ({
        ...prev,
        following: prev.following.filter(
          (f) => f.followee.username !== username,
        ),
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRequests = async () => {
    try {
      setLoading(true);
      const res = await getRequests();
      setRequests(res.requests);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptFollowRequest = async (username) => {
    try {
      setLoading(true);
      const res = await acceptFollowRequest(username);
      setRequests((prev) => ({
        ...prev,
        requests: prev.requests.filter((r) => r.follower.username !== username),
      }));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRejectFollowRequest = async (username) => {
    try {
      setLoading(true);
      const res = await rejectFollowRequest(username);
      setRequests((prev) => ({
        ...prev,
        requests: (prev?.requests || []).filter(
          (r) => r.follower.username !== username,
        ),
      }));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGetAllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.users);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetRequests();
    handleGetAllUsers();
  }, []);

  return {
    handleFollow,
    handleUnFollow,
    loading,
    requests,
    users,
    handleGetRequests,
    handleAcceptFollowRequest,
    handleRejectFollowRequest,
  };
}
