import React, { useRef } from 'react';
import { useState } from 'react';
import { Text, Box, Flex, InputGroup, InputRightElement, Button, Input, useDisclosure} from '@chakra-ui/react';
import { NotificationsLogo, UnlikeLogo, CommentLogo } from '../../assets/constants';
import usePostComment from '../../hooks/usePostComment';
import useAuthStore from '../../Store/authStore';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from "../../../src/utils/timeago";
import CommentsModal from '../Modules/CommentsModal';

const PostFooter = ({ post = {}, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
   const {isOpen,onOpen,onClose}= useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  const focusCommentInput = () => commentRef.current.focus();

  return (
    <Box mb={10} mt="auto">
      <Flex alignItems="center" gap={4} w="full" pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor="pointer" fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box onClick={focusCommentInput} cursor="pointer" fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize="sm">
        {likes} likes
      </Text>
      {isProfilePage && (
        <Text fontSize="12" color="gray">
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
      {!isProfilePage && creatorProfile && (
        <>
          <Text fontSize="sm" fontWeight={700}>
            {creatorProfile.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text fontSize="sm" color="gray" cursor="pointer"
            onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post}/>:null}
        </>
      )}
      {authUser && (
        <Flex alignItems="center" gap={2} justifyContent="space-between" w="full">
          <InputGroup>
            <Input
              variant="flushed"
              placeholder="Add a comment..."
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color="blue.500"
                fontWeight={600}
                cursor="pointer"
                _hover={{ color: "white" }}
                bg="transparent"
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
