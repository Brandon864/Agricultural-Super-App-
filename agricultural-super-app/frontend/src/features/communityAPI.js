import api from '../../services/api';

export default {
  getAll: async () => {
    const response = await api.get('/communities');
    return response.data;
  },
  join: async (communityId) => {
    const response = await api.post(`/communities/${communityId}/join`);
    return response.data;
  }
};