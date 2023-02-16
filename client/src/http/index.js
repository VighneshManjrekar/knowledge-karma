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
export const logout = () => api.get("/api/auth/logout")


//Admin Routes
export const getResources = () => api.get("/api/admin/resources")
export const updateResources = (id) => api.put(`/api/admin/resources/${id}`)


//Products Routes
export const getAllProducts = () => api.get("/api/resources")
export const getProduct = (id) => api.get(`/api/resources/${id}`)
export const createProduct = (data) => api.post("/api/resources", data)
export const deleteUserResource = (id) => api.delete(`/api/resources/${id}`)
export const updateUserResource = (id, data) => api.put(`/api/resources/${id}`, data)


//Reviews 
export const getReviews = (id) => api.get(`/api/resources/${id}/reviews`)
export const deleteReview = (resourceId, reviewId) => api.delete(`/api/resources/${resourceId}/reviews/${reviewId}`)
export const createReview = (resourceId, data) => api.post(`/api/resources/${resourceId}/reviews`, data)

//Ranking
export const getRanking = () => api.get("/api/auth/ranking")

//Subscribe
export const subscribe = (resourceId) => api.get(`/api/auth/subscribe/${resourceId}`)
export const Unsubscribe = (resourceId) => api.get(`/api/auth/unsubscribe/${resourceId}`)


