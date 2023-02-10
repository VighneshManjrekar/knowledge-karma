import { login, register, verifyToken } from "../../http/index"


// Register user
const registerUser = async (data) => {


    const response = await register(data);
    console.log(response.data)
    return response.data
}


// Login user
const loginUser = async (data) => {

    const response = await login(data);
    console.log(response.data)
    return response.data
}


// Verify User Access Token
const verifyUser = async () => {
    const response = await verifyToken();
    return response.data
}

const authService = {
    registerUser,
    loginUser,
    verifyUser,

    // login,
}

export default authService