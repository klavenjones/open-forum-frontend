import type { AxiosStatic } from 'axios';

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
};

export class ApiConfiguration {
  accessToken?: string;
}

export interface IApiClient {
  post<Request, Response>(path: string, object: Request, config?: RequestConfig): Promise<Response>;
  patch<Request, Response>(path: string, object: Request): Promise<Response>;
  put<Request, Response>(path: string, object: Request): Promise<Response>;
  get<Response>(path: string): Promise<Response>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosStatic;

  constructor(apiClient: AxiosStatic) {
    this.client = apiClient;
  }

  async post<Request, Response>(path: string, body: Request, config?: RequestConfig | undefined): Promise<Response> {
    try {
      const response = config
        ? await this.client.post<Response>(path, body, config)
        : await this.client.post<Response>(path, body);
      return response.data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
  async patch<Request, Response>(path: string, body: Request): Promise<Response> {
    try {
      const response = await this.client.patch<Response>(path, body);
      return response.data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async put<Request, Response>(path: string, body: Request): Promise<Response> {
    try {
      const response = await this.client.put<Response>(path, body);
      return response.data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async get<Response>(path: string): Promise<Response> {
    try {
      const response = await this.client.get<Response>(path);
      return response.data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
