import React from 'react'
import { Outlet, Link } from "react-router-dom";


function Home() {
    return (
        <div>
            <h1>Home Component</h1>
            <Outlet sx={{ mt: 0 }} />
        </div>
    )
}

export default Home