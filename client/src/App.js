import React, { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import authService from './features/auth/authService';
import { useSelector, useDispatch } from 'react-redux';
import { changeRes, setUser } from './features/auth/authSlice';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/Admin';
import Marketplace from './pages/Marketplace';
import Home from './components/Home';
import CommunityTab from './pages/CommunityTab';
import Contributors from './pages/Contributors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from "./components/auth/Auth"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SingleProduct from "./pages/SingleProduct";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';



function App() {
  const { user } = useSelector(state => state.auth)
  const [loggedIn, setLoggedIn] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkSession = async () => {
      const userData = await authService.getLoginUser();
      // console.log(userData)

      const subscribedRes = userData.user.resourceSubscribed
      let subscribedResList = []
      subscribedRes?.map(res => subscribedResList.push(res._id))


      if (userData.success) {
        dispatch(setUser(userData.user))
        dispatch(changeRes(subscribedResList))
        setLoggedIn(true)
      } else {
        console.log("User session expired")
      }
    }



    checkSession()


  }, [])



  // const onClick = async () => {
  //   console.log(user)
  //   const data = {
  //     // name: "John",
  //     email: "din@gmail.com",
  //     password: "johndoe"
  //   }


  //   // const userData = await authService.loginUser(data);
  //   const userData = await authService.getLoginUser();

  //   console.log(userData)

  //   // dispatch(setUser(userData.data))
  // }

  return (
    <div className="App">
      <ToastContainer />
      {/* <button onClick={onClick}>Click Me</button> */}
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path='/' element={<Auth />}>
            <Route index={true} element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
          <Route path='/' element={<Home />} >
            <Route path='community' element={<CommunityTab />} />
            <Route path='contributers' element={<Contributors />} />
            <Route path='marketplace' element={<Marketplace />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/admin' element={<Admin />} />
          </Route>
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}


const Protected = () => {
  const { user } = useSelector((state) => state.auth);
  return user.role && user.role === "admin" ? <Outlet /> : <Navigate to={"/marketplace"} />
}

export default App;