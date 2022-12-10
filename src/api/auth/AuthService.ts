import type { IApiClient } from '../ApiClient';

export interface IAuthApiClient {
  registerUser(username: string, password: string): Promise<any>;
}

export class AuthApiClient implements IAuthApiClient {
  authApiClient: IApiClient;

  constructor(authApiClient: IApiClient) {
    this.authApiClient = authApiClient;
  }

  async registerUser(username: string, password: string): Promise<any> {
    try {
      const response = await this.authApiClient.post(`/auth/register`, {
        username: username,
        password: password,
      });

      return response;
    } catch (error) {
      throw new Error('Something went wrong')
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
