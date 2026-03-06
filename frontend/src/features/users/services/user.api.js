import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const unFollow = async (username) => {
  try {
    const response = await api.get(`/user/unfollow/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};
export const follow = async (username) => {
  try {
    const response = await api.get(`/user/follow/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

export const acceptFollowRequest = async (username) => {
  try {
    const response = await api.get(`/user/followrequest/accept/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error accepting follow request:", error);
    throw error;
  }
};
export const rejectFollowRequest = async (username) => {
  try {
    const response = await api.get(`/user/followrequest/reject/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting Folloe request", error);
    throw error;
  }
};


export const getRequests = async()=>{
  try{
    const response = await api.get("/user/requests")
    return response.data
  }
   catch (error) {
    console.error("Error getting requests", error);
    throw error;
   }
}
export const getAllUsers = async()=>{
  try{
    const response = await api.get("user/users")
    return response.data
  }
   catch (error) {
    console.error("Error getting users:", error);
    throw error;
   }
}