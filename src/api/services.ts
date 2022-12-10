import ApiClient from './ApiClient';
import axios from './lib/axios';
import AuthService, { AuthApiClient } from './auth/AuthService';

const authApiClient = new AuthApiClient(new ApiClient(axios));
export const authService = new AuthService(authApiClient);
