import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function loginUser(username, password) {
  try {
    let response = await api.post("/api/auth/login", { username, password });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function registerUser(username, email, password) {
  try {
    let response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
