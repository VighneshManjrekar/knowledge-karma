import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authService from "../features/auth/authService"
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import "../components/auth/auth.css";
import { FormControl } from '@mui/material';
// import resetPasswordFunc

export default function ResetPassword() {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const { id, token } = useParams()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setCPassword] = useState('')
    const [error, setError] = useState(false)
    const [helperText, setHelperText] = React.useState('');



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!password) {
            setError(true);
            setHelperText("Password not entered")
        }
        if (!c_password) {
            setError(true);
            setHelperText("Confirm Password not entered")
        }
        if(password != c_password){
            setError(true);
            setHelperText("Confirm Password not entered")
        }
        const data1 = {
            email
        }
        const data = {
             password, id, token
        }
        const response = await authService.resetPasswordFunc(data)
        if (response.success) {
            setError(false);
            setHelperText('')
            navigate('/marketplace')
        }
        if (!response.success) {
            setError(true);
            setHelperText("Unable to proceed")
        }
    }


    return (
        <div style={{display:"flex", alignItems:'center', justifyContent:"center"}}>
        <Container
            className="loginFormComponent mx-0 px-0"
            component="main"
            maxWidth="xs"
            sx={{ bgcolor: "transparent", justifyContent:'center'}}
        >
            <CssBaseline />
            <div></div>
            <Box
                sx={{
                    margin: "100px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent:"center"

                }}
            >
                <Avatar className="avatarIcon" sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, color: "text.primary" }}
                >
                    <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>
                    <FormControl error={error} sx={{ width: 400 }}>
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="c_password"
                            label="Password"
                            type="password"
                            id="password"
                            sx={{
                                bgcolor: "bgc.secondary",
                                color: "text.primary",
                                borderRadius: 2,
                            }}
                            value={password}
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
                            Reset Password
                        </Button>
                    </FormControl>
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
    </div>
    );
}