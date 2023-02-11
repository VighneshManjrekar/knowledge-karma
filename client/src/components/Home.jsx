import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Drawer from './Drawer';

function Home() {
  return (
    <div>
      {/* <Drawer /> */}
      <Outlet sx={{ mt: 0 }} />
    </div>
  )
}

export default Home
