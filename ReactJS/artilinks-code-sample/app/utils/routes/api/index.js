// variables with paths to api endpoints
export const API_URL = 'http://localhost:3000/api';

// auth
export const LOGIN_API_URL = `${API_URL}/auth/login`;
export const REGISTER_API_URL = `${API_URL}/auth/register`;
export const LOGOUT_API_URL = `${API_URL}/auth/logout`;
export const REFRESH_API_URL = `${API_URL}/auth/refresh`;

// password recovery
export const RECOVERY_API_URL = `${API_URL}/auth/recovery`;

// email confirm
export const CONFIRM_API_URL = `${API_URL}/auth/confirm`;