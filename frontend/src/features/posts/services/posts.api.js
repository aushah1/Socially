import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function getFeed() {
  try {
    const posts = await api.get("/posts/feed");
    return posts.data;
  } catch (err) {
    throw err;
  }
}

export async function likePost(postId) {
  try {
    const like = await api.get(`/posts/like/${postId}`);
    return like.message;
  } catch (err) {
    console.log(err);
  }
}

