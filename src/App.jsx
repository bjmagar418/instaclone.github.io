//import { useState } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom';
import './App.css'
//import { Button } from '@chakra-ui/react';
import Homepage from './Pages/Homepages/Homepage';
import Authpage from './Pages/Authpage/Authpage';
import PageLayout from './Layouts/PageLayout';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
//import useAuthStore from './Store/authStore';
import { auth } from './firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
function App() {
  const [authUser]= useAuthState(auth);
  return (
    <PageLayout>
     <Routes>
         <Route path="/" element={authUser?<Homepage/>:<Navigate to ="/auth"/>}/>
         <Route path="/auth" element={!authUser?<Authpage/>:<Navigate to ="/"/>}/>
         <Route path="/:username" element={<ProfilePage/>}/>

     </Routes>
    </PageLayout>
  )
}

export default App
