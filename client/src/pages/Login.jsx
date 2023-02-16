import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from "../features/auth/authService"
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import "../components/auth/auth.css";

export default function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            return
        }
        const data = {
            email, password
        }
        const response = await authService.loginUser(data)
        if (response.success) {
            dispatch(setUser(response.data))
            navigate('/marketplace')
        }
    }


    return (
        <Container
            className="loginFormComponent mx-0 px-0"
            component="main"
            maxWidth="xs"
            sx={{ bgcolor: "transparent", margin: 10 }}
        >
            <CssBaseline />
            <div></div>
            <Box
                sx={{
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar className="avatarIcon" sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login to Continue
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, color: "text.primary" }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Email Address"
                        name="email"
                        sx={{
                            bgcolor: "bgc.secondary",
                            color: "text.primary",
                            borderRadius: 2,
                        }}
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        sx={{
                            bgcolor: "bgc.secondary",
                            color: "text.primary",
                            borderRadius: 2,
                        }}
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        color="secondary"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to="signup"
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}