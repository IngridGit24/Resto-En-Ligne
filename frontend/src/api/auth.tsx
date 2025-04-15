import api, { getCsrfToken } from './axios';  

export const login = async (email: string, password: string) => {
  await getCsrfToken();
  return api.post('/login', { email, password });
};

export const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
  await getCsrfToken();
  return api.post('/register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
};

export const getUser = () => api.get('/user');

export const logout = () => api.post('/logout');
