import React from 'react'
import { Outlet, Link, Navigate } from "react-router-dom";
import Drawer from './Drawer';
import { useSelector } from 'react-redux';

function Home() {
  return (
    <div>
      {/* <Drawer /> */}
      <Outlet sx={{ mt: 0 }} />
    </div>
  )
}

export default Home
