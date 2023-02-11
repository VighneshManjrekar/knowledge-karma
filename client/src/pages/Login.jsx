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

// theme to be created


export default function Login() {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ status: "success", msg: "Logged in Successfully !" })
    const [creds, setCreds] = useState({ email: "", password: "" });


    // add function to check user credentials
    const [loggedIn, setLoggedIn] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

    };

    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
        if (creds.email && creds.password) {
            setLoggedIn(true);
        }
        else {
            setLoggedIn(false);
        }
        // this syntax tells that - keep newNote as it is and keep updating e.target.val
    };


    return (
        <Container
            className="loginFormComponent mx-0 px-0"
            component="main"
            maxWidth="xs"
            sx={{ bgcolor: "transparent" }}
        >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
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
                        onChange={handleOnChange}
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
                        autoComplete="current-password"
                        onChange={handleOnChange}
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
                        onClick="handleSubmit"
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