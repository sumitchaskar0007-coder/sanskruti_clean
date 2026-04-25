import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  verify: () => API.get('/auth/verify'),
};

export const galleryAPI = {
  getAll: () => API.get('/gallery'),
  create: (formData) =>
    API.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    API.put(`/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => API.delete(`/gallery/${id}`),
};

export const announcementsAPI = {
  getAll: () => API.get('/announcements'),
  create: (data) => API.post('/announcements', data),
  update: (id, data) => API.put(`/announcements/${id}`, data),
  delete: (id) => API.delete(`/announcements/${id}`),
};

export const careersAPI = {
  getAll: () => API.get('/careers'),
  create: (data) => API.post('/careers', data),
  update: (id, data) => API.put(`/careers/${id}`, data),
  delete: (id) => API.delete(`/careers/${id}`),
};


// BLOG API
export const blogAPI = {
  getAll: () => API.get("/blogs"),
  getById: (id) => API.get(`/blogs/${id}`),
  create: (formData) =>
    API.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    API.put(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => API.delete(`/blogs/${id}`),
};

