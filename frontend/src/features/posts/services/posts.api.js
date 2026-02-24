import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export async function getFeed() {
  try {
    const posts = await api.get("/feed");
    return posts.data;
  } catch (err) {
    console.log(err);
  }
}

export async function likePost(postId) {
  try {
    const like = await api.get(`/like/${postId}`);
    return like.message;
  } catch (err) {
    console.log(err);
  }
}
