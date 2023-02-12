import React from 'react'
import { Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Drawer />
      <Outlet sx={{ mt: 0 }} />
    </div>
  )
}

export default Home
