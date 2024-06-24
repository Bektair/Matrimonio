export const API_URL =  process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_API_URL_DEV : import.meta.env.VITE_APP_API_URL
export const domain =  process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_DOMAIN_DEV : import.meta.env.VITE_APP_AUTH0_DOMAIN
export const clientId =  process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_CLIENT_ID_DEV : import.meta.env.VITE_APP_AUTH0_CLIENT_ID 
export const redirectUri =  process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_CALLBACK_URL_DEV : import.meta.env.VITE_APP_AUTH0_CALLBACK_URL
export const audience =  process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_AUDIENCE_DEV : import.meta.env.VITE_APP_AUTH0_AUDIENCE
export const management_auth_token =  process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_AUTH0_MANAGEMENT_API_TOKEN_DEV  : import.meta.env.VITE_APP_AUTH0_MANAGEMENT_API_TOKEN
export const app_name = process.env.NODE_ENV=="development" ? import.meta.env.VITE_APP_APP_NAME_DEV : import.meta.env.VITE_APP_APP_NAME
export const googleApiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY