import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getFeed, likePost } from "../services/posts.api";

export function UsePost() {
  const context = useContext(PostContext);
  const {  post, setPost, feed, setFeed, loading, setLoading } =
    context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.posts);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleLikePost = async (postId) => {
    setFeed((prevFeed) =>
      prevFeed.map((post) =>
        post._id == postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
    try {
      await likePost(postId);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleGetFeed,
    handleLikePost,
    loading,
    feed,
    post,
  };
}
