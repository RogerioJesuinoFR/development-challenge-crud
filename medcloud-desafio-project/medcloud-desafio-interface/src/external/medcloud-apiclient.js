import axios from 'axios';

const API_URL = process.env.REACT_APP_MEDCLOUD_API_URL;

export const getPatients = async (page, limit) => {
  try {
    const response = await axios.get(`${API_URL}/patients`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const addPatient = async (patient) => {
  try {
    const response = await axios.post(`${API_URL}/patients`, patient);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatient = async (id, updatedPatient) => {
  try {
    const response = await axios.put(`${API_URL}/patients/${id}`, updatedPatient);
    return response.data;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const removePatient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error removing patient:', error);
    throw error;
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    throw error;
  }
};
