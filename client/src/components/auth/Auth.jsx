import React from 'react'
import loginImg from "../../media/login-back2.png";
import { Box } from '@mui/material';
import "./auth.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



export default function Auth() {
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)


    if (user) {
        navigate('/marketplace')
    }

    return (
        <div>
            <Box className="login_home">
                <Box
                    className="login_bar"
                >
                    <img src={loginImg} className="loginBack2_Img mx-0 px-0" alt="login here" />
                </Box>
                <Box className="loginForm">
                    <Outlet sx={{ mt: 0 }} />
                </Box>
            </Box>
        </div>
    )
}