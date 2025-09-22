import axios from "axios";

export interface RegisterRequest {
  // name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

const API_BASE = "http://localhost:3000";

export async function registerUser(data: RegisterRequest): Promise<void> {
  await axios.post(`${API_BASE}/auth/signup`, data);
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const res = await axios.post(`${API_BASE}/auth/login`, data);
  return res.data as LoginResponse;
}
