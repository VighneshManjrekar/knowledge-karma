import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:7000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


//Auth Routes
export const register = async (data) => await api.post("/api/auth/register", data)
export const login = async (data) => await api.post("/api/auth/login", data)
export const getUser = () => api.get("/api/auth/profile")


//Admin Routes
export const getResources = () => api.get("/api/admin/resources")
export const updateResources = (id) => api.put(`/api/admin/resources/${id}`)


//Products Routes
export const getAllProducts = () => api.get("/api/resources")
export const getProduct = (id) => api.get(`/api/resources/${id}`)
export const createProduct = (data) => api.post("/api/resources", data)
export const deleteProduct = (id) => api.delete(`/api/resources/${id}`)

//Reviews 
export const getReviews = (id) => api.get(`/api/resources/${id}/reviews`)
export const deleteReview = (resourceId, reviewId) => api.delete(`/api/resources/${resourceId}/reviews/${reviewId}`)

//Ranking
export const getRanking = () => api.get("/api/auth/ranking")


