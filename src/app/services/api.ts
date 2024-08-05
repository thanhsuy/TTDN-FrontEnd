// api.ts
import axios from 'axios';
import { ProfileData, SearchCarRequest, SearchCarResponse, ViewCarDetailsResponse } from '../interfaces';

const API_URL = 'http://localhost:8080'; // Địa chỉ BE của bạn


export const logout = () => {
  localStorage.removeItem('authToken'); // Xóa token khỏi localStorage
};

export const fetchProfile = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${API_URL}/user/myInfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch profile error:', error);
    throw error;
  }
};

export const updateProfile = async (userId: number, profileData: ProfileData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(`${API_URL}/editProfile/${userId}`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const searchCar = async (searchCarRequest: SearchCarRequest) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.post(`${API_URL}/searchCar/new`, searchCarRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching for cars:', error);
    throw error;
  }
};

export const viewCarDetails = async (id: number) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${API_URL}/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw error;
  }
};