import { Button,Avatar, Flex,Box, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../../hooks/useFollowUser'
import { Link } from 'react-router-dom'
import  {timeAgo} from "../../utils/timeago";

const PostHeader = ({post,creatorProfile}) => {
const {handleFollowUser,isFollowing,isUpdating}=useFollowUser(post.createdBy);
 
return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
    <Flex alignItems={"center"} gap={2}>
  {creatorProfile?(
     <Link to={`/${creatorProfile.username}`}>
     <Avatar src={creatorProfile.profilePicURl} alt="user profile pic" size={"sm"}/>
     </Link>
  ):(
    <SkeletonCircle size="10"/>
  )}
 
    <Flex fontSize={12} fontWeight={"bold"} gap="2">
      {creatorProfile?(
          <Link to={`/${creatorProfile.username}`}>
          {creatorProfile.username}
          </Link>
        
      ):(
   <Skeleton w={"100px"} h={"100px"}/>
      )}
   <Box color={"gray.500"}>
         . {timeAgo(post.createdAt)}
         </Box>
    </Flex>
    </Flex>
    <Box cursor={"pointer"}>
        <Button
        bg={"transparent"}
        fontSize={12}
        color={"blue.500"}
        fontWeight={"bold"}
        _hover={{
            color:"white"
        }}
        transition={"0.2s ease-in-out"}
        onClick={handleFollowUser}
        isLoading={isUpdating}
        >
  {isFollowing?"Unfollow":"Follow"}
        </Button>
    </Box>
    </Flex>
  )
}

export default PostHeader
