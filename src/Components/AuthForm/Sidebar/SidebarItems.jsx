import React from 'react'
import Home from './Home';
import CreatePost from './CreatePost';
import ProfileLink from './ProfileLink';
import Search from './Search';
import Notifications from './Notifications';
const SidebarItems = () => {
  return (
    <>
    <Home/>
    <Search/>
    <Notifications/>
    <CreatePost/>
    <ProfileLink/>
    </>
  )
}

export default SidebarItems
