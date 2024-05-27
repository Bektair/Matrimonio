export const API_URL = process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_API_URL : process.env.REACT_APP_API_URL;
export const domain = process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_DOMAIN : process.env.REACT_APP_API_URL;
export const clientId = process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_CLIENT_ID : process.env.REACT_APP_API_URL;
export const redirectUri = process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_CALLBACK_URL : process.env.REACT_APP_API_URL;
export const audience = process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_AUDIENCE : process.env.REACT_APP_API_URL;
export const management_auth_token = process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_MANAGEMENT_API_TOKEN : process.env.REACT_APP_AUTH0_MANAGEMENT_API_TOKEN;