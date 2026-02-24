import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed, likePost } from "../services/posts.api";

export function UsePost() {
  const context = useContext(PostContext);
  const { post, setPost, feed, setFeed, loading, setLoading } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };
  const handleLikePost = async (postId) => {
    setFeed((prevFeed) =>
      prevFeed.map((post) =>
        post._id == postId ? { ...post, isLiked: !post.isLiked } : post,
      ),
    );
    try {
      await likePost(postId);
    } catch (err) {
      console.log(err);
    }
  };

  return { handleGetFeed, handleLikePost, loading, feed, post };
}
