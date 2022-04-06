import React from 'react'
import {Outlet} from 'react-router-dom'
import NavbarComp from '../components/NavbarComp'

export default function Layout() {
  return (
    <div>
      <NavbarComp />
      <Outlet />
    </div>
  )
}
