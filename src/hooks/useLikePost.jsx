import { useState, useEffect } from "react";
import useAuthStore from "../Store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = (post = {}) => {
  const authUser = useAuthStore((state) => state.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(post.likes ? post.likes.includes(authUser?.uid) : false);
  const showToast = useShowToast();

  useEffect(() => {
    setLikes(post.likes ? post.likes.length : 0);
    setIsLiked(post.likes ? post.likes.includes(authUser?.uid) : false);
  }, [post, authUser]);

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
