import React, { useEffect } from 'react';
import './App.css';
import authService from './features/auth/authService';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './features/auth/authSlice';



function App() {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {

    const checkSession = async () => {
      if (!user) {
        const userData = await authService.verifyUser();
        console.log(userData.success)

        if (userData.success) {
          dispatch(getUser(userData.data))
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
    <div>
      <Navbar />
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

export default App;
