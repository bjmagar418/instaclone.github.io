/*import  { useEffect, useState } from 'react'
import useAuthStore from '../Store/authStore';
import useShowToast from './useShowToast';
import { firestore } from '../firebase/firebase';
import { collection,getDocs,limit, orderBy,query,where } from 'firebase/firestore';
const useGetSuggestedUsers = () => {
  const [isLoading,setIsLoading]= useState (true);
  const [suggestedUsers,setSuggestedUsers]= useState([]);
  const authUser = useAuthStore((state)=> state.user);
   const showToast = useShowToast();
   useEffect(()=>{
 const getSuggestedUsers = async ()=>{
    setIsLoading(true);
    try{
    const usersRef= collection(firestore,"users");
    const q= query(
        usersRef,
        where("uid","not-in",[authUser.uid,...authUser.following]),
        orderBy("uid"),
        limit(3)
    )
    const querySnapshot= await getDocs(q);
    const users= [];
    querySnapshot.forEach(doc=>{
        users.push({...doc.data(),id:doc.id});
    })
    setSuggestedUsers(users);
    }catch(error){
     showToast("Error",error.message,"error");
    } finally {
        setIsLoading(false);
    }
 }
 if(authUser) getSuggestedUsers()
   },[authUser,showToast])
return {isLoading,suggestedUsers}
}

export default useGetSuggestedUsers
*/
import { useEffect, useState, useCallback } from 'react';
import useAuthStore from '../Store/authStore';
import useShowToast from './useShowToast';
import { firestore } from '../firebase/firebase';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  const getSuggestedUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(firestore, "users");

      // Check if the following list is not too large for the not-in query
      const followingList = authUser.following.slice(0, 9); // Only take the first 9
      const combinedList = [authUser.uid, ...followingList];

      const q = query(
        usersRef,
        where("uid", "not-in", combinedList),
        orderBy("uid"),
        limit(3)
      );

      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setSuggestedUsers(users);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [authUser, showToast]);

  useEffect(() => {
    if (authUser) {
      getSuggestedUsers();
    }
  }, [authUser, getSuggestedUsers]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
