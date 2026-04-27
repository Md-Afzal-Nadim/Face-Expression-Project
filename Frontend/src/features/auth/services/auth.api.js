import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://face-expression-project-1.onrender.com",

  withCredentials: true
});



             // User Register
export async function register({ username, email, password }) {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password
  })
  return response.data
}


           
               // User Login
export async function login({username, email, password }) {
  const responce = await api.post("/api/auth/login", {
    email,
    username,
    password
  })
  return responce.data
}



               // User Logout
export async function logout() {
  const responce = await api.get("/api/auth/logout")
  return responce.data
}




               // Get User (data ko fetch karne ke liye)
export async function getMe() {
  const responce = await api.get("/api/auth/get-me")
  return responce.data
}