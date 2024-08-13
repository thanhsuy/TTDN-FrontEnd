// api.ts
import axios from 'axios';

import { EditBookingDetailsRequest, FeedbackResponse, ProfileData, SearchCarRequest, SearchCarResponse, TopUpRequest, ViewBookingListResponse, ViewCarDetailsResponse, ViewWalletResponse, WithdrawRequest, SearchCarNewRequest } from '../interfaces';

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

export const searchCarNew = async (searchCarNewRequest: SearchCarNewRequest) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.post(`${API_URL}/searchCar/new`, searchCarNewRequest, {
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

export const getBookingsForCurrentUser = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get<ViewBookingListResponse[]>(`${API_URL}/view-bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const getBookingById = async (id: number) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get<ViewBookingListResponse>(`${API_URL}/view-bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    throw error;
  }
};

export const updateBooking = async (id: number, bookingRequest: EditBookingDetailsRequest) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.put<ViewBookingListResponse>(`${API_URL}/edit-booking/${id}`, bookingRequest, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const getWalletDetails = async (): Promise<ViewWalletResponse> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${API_URL}/viewWallet`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet details:', error);
    throw error;
  }
};

// export const getFeedbackReport = async (): Promise<FeedbackResponse[]> => {
//   const token = localStorage.getItem('authToken');
//   if (!token) {
//     throw new Error('Token not found');
//   }

//   try {
//     const response = await axios.get(`${API_URL}/viewFeedbackReport`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching feedback report:', error);
//     throw error;
//   }
// };

export const topUpWallet = async (topUpRequest: TopUpRequest): Promise<ViewWalletResponse> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.post(`${API_URL}/viewWallet/topup`, topUpRequest, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error topping up wallet:', error);
    throw error;
  }
};

export const withdrawFromWallet = async (withdrawRequest: WithdrawRequest): Promise<ViewWalletResponse> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.post(`${API_URL}/viewWallet/withdraw`, withdrawRequest, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error withdrawing from wallet:', error);
    throw error;
  }
};

export const searchTransactions = async (startDate: string, endDate: string): Promise<ViewWalletResponse> => {
  const response = await axios.get('/viewWallet/search', { params: { startDate, endDate } });
  return response.data;
};

export const getFeedbackReport = async (rate?: number): Promise<FeedbackResponse[]> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${API_URL}/viewFeedbackReport`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { rate },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback report:', error);
    throw error;
  }
};

export const getAverageRating = async (): Promise<number> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${API_URL}/viewFeedbackReport/averageRating`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
};

export const getCarAverageRating = async (idcar: number): Promise<number> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${API_URL}/viewFeedbackReport/cars/${idcar}/averageRatingByIdCar`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching car average rating:', error);
    throw error;
  }
};
