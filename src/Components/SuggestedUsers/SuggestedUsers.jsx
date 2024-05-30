/*import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import { VStack,Flex,Text,Box,Link} from '@chakra-ui/react';
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';
const SuggestedUsers = () => {
  const {isLoading,suggestedUsers}=useGetSuggestedUsers();

  if(isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
     <SuggestedHeader/>
      {suggestedUsers.length!==0 && (
             <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
             <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
               Suggested for you
             </Text>
             <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.500"}} cursor={"pointer"}>
               See All
             </Text>
          </Flex>
      )}
         {suggestedUsers.map(user =>(
          <SuggestedUser user = {user} key= {user.id}/>
         ))}
        <Box
        fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}
        >
        ©2023 Built By Bijaya Pun
        <Link href={"https://bijayapun.netlify.app/"} target='_blank' color='blue.500' fontSize={14} mx={2}>
       asaprogrammer
        </Link>
        </Box>
    </VStack>
  )
}

export default SuggestedUsers*/
import React, { useEffect, useState } from 'react';
import SuggestedHeader from './SuggestedHeader';
import { VStack, Flex, Text, Box, Link } from '@chakra-ui/react';
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers: initialSuggestedUsers } = useGetSuggestedUsers();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setSuggestedUsers(initialSuggestedUsers);
    }
  }, [isLoading, initialSuggestedUsers]);

  const updateUser = (updatedUser) => {
    setSuggestedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.uid === updatedUser.uid ? updatedUser : user
      )
    );
  };

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.500" }} cursor={"pointer"}>
            See All
          </Text>
        </Flex>
      )}
      {suggestedUsers.map(user => (
        <SuggestedUser user={user} key={user.uid} setUser={(updatedUser) => updateUser(updatedUser)} />
      ))}
      <Box
        fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}
      >
        ©2023 Built By Bijaya Pun
        <Link href={"https://bijayapun.netlify.app/"} target='_blank' color='blue.500' fontSize={14} mx={2}>
          asaprogrammer
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
