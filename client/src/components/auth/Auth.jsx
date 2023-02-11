import React from 'react'
import loginImg from "../../media/login-back2.png";
import Login from "./Login";
import Signup from "./Signup";
import { Box } from '@mui/material';
import "./auth.css";
import { Outlet, Link } from "react-router-dom";



export default function Auth() {
  return (
    <div>
        <Box className="login_home">
            <Box
            className="login_bar mx-0 px-0"
            sx={{ bgcolor: "linear-gradient(blue, red)" }}
            >
                  <img src={loginImg} className="loginBack2_Img mx-0 px-0"   alt="login here" />
                </Box>
                <Box className="loginForm">
                <Outlet sx={{ mt: 0 }} />
            </Box>
        </Box>
    </div>
  )
}
