import { getUser, login, register, logout, resetPassword, forgotPassword } from "../../http/index"


// Register user
const registerUser = async (data) => {
    const response = await register(data);
    console.log(response.data)
    return response.data
}

// Logout user
const logoutUser = async () => {
    // console.log("Test 2")
    const response = await logout();
    console.log(response.data);
    return response.data
}

// Login user
const loginUser = async (data) => {

    const response = await login(data);
    console.log(response.data)
    return response.data
}

const ForgotPassword = async (data) =>{
    const response = await forgotPassword(data);
    return response.data
}

const resetPasswordFunc = async (data) =>{
    const response = await resetPassword(data);
    console.log(response.data);
    return response.data
}



// Verify User Access Token
const getLoginUser = async () => {
    const response = await getUser();
    return response.data
}

const authService = {
    registerUser,
    loginUser,
    getLoginUser,
    logoutUser,
    resetPasswordFunc,
    ForgotPassword
}

export default authService