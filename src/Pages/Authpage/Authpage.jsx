import React from 'react'
import {Container,Flex,Box,Image,VStack} from"@chakra-ui/react";
import AuthForm from '../../Components/AuthForm/AuthForm';
const Authpage = () => {
  return (
      <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"} padding={0}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
{/*left hand0side */}
<Box display= {{base:"none",md:"block"}}>
   <Image src='/auth.png' h={650} alt="Phone_img"/>
  </Box>
  {/*Right hand side*/}
  <VStack spacing={4} align={"stretch"}>
   <AuthForm/>
   <Box textAlign={'center'}>Get the app</Box>
   <Flex gap={5} justifyContent={"center"}>
      <Image src='/playstore.png' h={"10"} alt='playstore logo'/>
      <Image src='/microsoft.png' h={"10"} alt='microsoft  logo'/>
   </Flex>
  </VStack >
            </Flex>
        </Container>
      </Flex>
  )
}

export default Authpage
