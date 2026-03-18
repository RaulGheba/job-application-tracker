import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getApplications = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createApplication = async (applicationData) => {
  const response = await axios.post(API_URL, applicationData);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateApplication = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};
