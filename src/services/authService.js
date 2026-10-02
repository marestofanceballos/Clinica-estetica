import api from "./api";
import { getToken, setToken, clearToken } from "./authToken";

export function login(username, password) {
  return api.post("/auth/login", { username, password }).then((res) => {
    setToken(res.data.token);
    return { username: res.data.username };
  });
}

export function logout() {
  clearToken();
}

export function hasToken() {
  return Boolean(getToken());
}

export function me() {
  return api.get("/auth/me").then((res) => res.data);
}
