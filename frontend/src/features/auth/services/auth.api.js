import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function loginUser(username, password) {
  try {
    let response = await api.post("/login", { username, password });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function registerUser(username, email, password) {
  try {
    let response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
