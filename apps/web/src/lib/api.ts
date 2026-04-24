import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Extend the InternalAxiosRequestConfig to include a custom retry property
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s
});

const maxRetries = 3;

api.interceptors.request.use((config: CustomInternalAxiosRequestConfig) => {
  if (config._retryCount === undefined) {
    config._retryCount = 0;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomInternalAxiosRequestConfig;
    
    if (!config) return Promise.reject(error);

    // 401 Unauthorized -> ToolCenter will handle the redirect
    if (error.response?.status === 401) {
      // Clear local auth state if needed
      // window.location.href = import.meta.env.VITE_TOOLCENTER_LOGIN_URL || 'http://localhost:3000/login';
      return Promise.reject(error);
    }

    // 5xx Server Errors -> Retry with exponential backoff
    if (error.response?.status && error.response.status >= 500 && config._retryCount! < maxRetries) {
      config._retryCount! += 1;
      const backoffDelay = Math.pow(2, config._retryCount!) * 1000; // 2s, 4s, 8s
      
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;
