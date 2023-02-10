import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5500',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


export const register = async (data) => await api.post("/api/auth/register", data)
export const login = async (data) => await api.post("/api/auth/login", data)
export const verifyToken = () => api.get("/api/auth/verify")