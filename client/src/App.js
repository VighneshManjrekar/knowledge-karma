import React, { useEffect } from 'react';
import './App.css';
import authService from './features/auth/authService';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice';

import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import Auth from "./components/auth/Auth";
import Community from './pages/Community';
import Contributors from './pages/Contributors';
import Marketplace from './pages/Marketplace';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



function App() {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {

    const checkSession = async () => {
      if (!user) {
        const userData = await authService.verifyUser();
        console.log(userData.success)

        if (userData.success) {
          dispatch(setUser(userData.data))
        } else {
          console.log("User session expired")
        }
      }
    }

    checkSession()

    return () => {

    }
  })

  const onClick = async () => {
    console.log(user)
    const data = {
      name: "John",
      email: "johndoe@gmail.com",
      password: "johndoe"
    }


    // const userData = await authService.registerUser(data);
    const userData = await authService.verifyUser();

    // console.log(userData)

    // dispatch(setUser(userData.data))
  }

  return (
    <div className="App">
      {/* <button onClick={onClick}>Click Me</button> */}
      <Router>
          <Navbar />
        <Routes>
            <Route path='auth/*' element={<Auth />}>
              <Route index={true} element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>
            <Route path='/' element={<Home />} >
              <Route path='community' element={<Community />} />
              <Route path='contributers' element={<Contributors />} />
              <Route path='marketplace' element={<Marketplace />} />
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
