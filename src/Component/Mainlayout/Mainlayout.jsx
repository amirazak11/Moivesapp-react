import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'

export default function Mainlayout({userData,logOut}) {
  return (
    <>
    <Navbar userData={userData} logOut={logOut}>

    </Navbar>
    <Outlet></Outlet>
    </>
  )
}
