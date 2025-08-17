import axios from 'axios';
import { toast } from "@/hooks/use-toast";

// Base API configuration
const API_BASE_URL = 'http://localhost:3000/api'; // Update this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    
    const message = error.response?.data?.message || 'An error occurred';
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (name:string, email: string, password: string) => 
    api.post('/auth/signup', {name, email, password }),
  
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
};

// Notes API
export const notesAPI = {
  create: (noteData: any) => 
    api.post('/notes/', noteData),
  
  getAll: () => 
    api.get('/notes'),
  
  update: (id: string, noteData: any) => 
    api.put(`/notes/${id}`, noteData),
  
  delete: (id: string) => 
    api.delete(`/notes/${id}`),
  
  share: (_id: string, recipients: string[]) => 
    api.post(`/notes/${_id}/share`, { recipients }),
};

export default api;