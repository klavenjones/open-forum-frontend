import ApiClient from './ApiClient';
import AuthService, { AuthApiClient } from './auth/AuthService';

const authApiClient = new AuthApiClient(new ApiClient());
export const authService = new AuthService(authApiClient);
