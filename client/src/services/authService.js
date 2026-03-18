import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data;
};
