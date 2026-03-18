import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getApplications = async () => {
  const response = await axios.get(API_URL, authHeaders());
  return response.data;
};

export const createApplication = async (applicationData) => {
  const response = await axios.post(API_URL, applicationData, authHeaders());
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return response.data;
};

export const updateApplication = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData, authHeaders());
  return response.data;
};
