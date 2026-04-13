import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Profile
export const getProfile = () => api.get('/profile');
export const updateProfile = (data, adminKey) =>
  api.put('/profile', { ...data, adminKey });

// Projects
export const getProjects = (params = {}) => api.get('/projects', { params });
export const createProject = (data, adminKey) =>
  api.post('/projects', { ...data, adminKey });
export const updateProject = (id, data, adminKey) =>
  api.put(`/projects/${id}`, { ...data, adminKey });
export const deleteProject = (id, adminKey) =>
  api.delete(`/projects/${id}`, { data: { adminKey } });

// Messages
export const sendMessage = (data) => api.post('/messages', data);
export const getMessages = (adminKey) =>
  api.get('/messages', { params: { adminKey } });
export const markMessageRead = (id, adminKey) =>
  api.patch(`/messages/${id}/read`, { adminKey });
export const deleteMessage = (id, adminKey) =>
  api.delete(`/messages/${id}`, { data: { adminKey } });

export default api;
