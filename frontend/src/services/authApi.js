// // Authentication API service
// import axios from 'axios';

// const API = axios.create({
//     baseURL : "http://localhost:5000/api/auth"
// })

// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem("token")

//     if(token){
//         req.headers.authorization = `Bearer ${token}`
//     }

//     return req
// })

// export const loginUser = (data) => API.post("/login" , data)

// export const registerUser = (data) => API.post("/register" , data)

// export const forgotPassword = (data) => API.post("/forgot-password" , data)

// export const resetPassword = (token , data) => API.post(`/reset-password/${token}`, data)

// export const getMe = () => API.get("/me")

