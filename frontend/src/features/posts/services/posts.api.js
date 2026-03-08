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

export async function createPost(caption, file) {
  try {
    const formData = new FormData();

    formData.append("caption", caption);

    if (file) {
      formData.append("image", file);
    }

    const post = await api.post(`/posts`, formData);

    return post.data;
  } catch (err) {
    console.log(err);
  }
}
