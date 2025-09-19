import axios from "axios";
// import type { User } from "@/types/user";
export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};
export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  updateAt: Date;
  createAt: Date;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
