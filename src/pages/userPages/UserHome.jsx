import { Navbar } from '@material-tailwind/react'
import React from 'react'
import { UserNavbar } from './UserNavbar'
import UserFooter from '../../components/userComponents/UserFooter'
import UserHeader from '../../components/userComponents/UserHeader'
import Gallery from '../../components/userComponents/Gallery'

function UserHome() {
  return (
    <div>
      <UserNavbar/>
      <UserHeader/>
      <Gallery/>
      <UserFooter/>
    </div>
  )
}

export default UserHome
