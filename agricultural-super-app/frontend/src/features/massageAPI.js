import api from '../../services/api';

export default {
  getByThread: async (threadId) => {
    const response = await api.get(`/messages/${threadId}`);
    return response.data;
  },
  create: async (threadId, content) => {
    const response = await api.post(`/messages/${threadId}`, { content });
    return response.data;
  }
};