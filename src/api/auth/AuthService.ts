import type { IApiClient } from '../ApiClient';

export interface IAuthApiClient {
  registerUser(username: string, password: string): Promise<any>;
}

export class AuthApiClient implements IAuthApiClient {
  baseUrl: string;
  authApiClient: IApiClient;

  constructor(authApiClient: IApiClient) {
    this.baseUrl = 'http://localhost:3000';
    this.authApiClient = authApiClient;
  }

  async registerUser(username: string, password: string): Promise<any> {
    try {
      const response = await this.authApiClient.post(`${this.baseUrl}/auth/register`, {
        username: username,
        password: password,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default class AuthService {
  authApiClient: IAuthApiClient;

  constructor(authApiClient: IAuthApiClient) {
    this.authApiClient = authApiClient;
  }

  async registerUser(username: string, password: string): Promise<any> {
    return this.authApiClient.registerUser(username, password);
  }
}
