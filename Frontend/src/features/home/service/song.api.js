import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://face-expression-project-1.onrender.com",
  withCredentials: true
})


export async function getSong({ mood }) {
  const response = await api.get("/api/songs?mood=" + mood)
  console.log(response);
  return response.data
}