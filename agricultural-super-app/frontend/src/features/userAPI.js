import api from '../../services/api';

export default {
  getProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  update: async (profileData) => {
    const response = await api.put('/users/me', profileData);
    return response.data;
  }
};