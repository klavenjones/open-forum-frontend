import { vi, expect, describe, beforeEach, it } from 'vitest';
import ApiClient from '../ApiClient';
import axios from 'axios';
import { mockRegisterResponse } from '@/mocks/mockRegisterResponse';

vi.mock('axios');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ApiClient', () => {
  it('should call axios get method', async () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);

    await apiClient.get('/test');

    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/test');
  });
  it('should should call axios post method', async () => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);

    await apiClient.post('/test', { data: 'Some Data' });

    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/test', { data: 'Some Data' });
    expect(axios.post).toHaveReturnedWith(mockRegisterResponse);
  });
  it('should should call axios put method', async () => {
    vi.spyOn(axios, 'put').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);

    await apiClient.put('/test', { data: 'Some Data' });

    expect(axios.put).toBeCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith('/test', { data: 'Some Data' });
    expect(axios.put).toHaveReturnedWith(mockRegisterResponse);
  });
  it('should should call axios patch method', async () => {
    vi.spyOn(axios, 'patch').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);

    await apiClient.patch('/test', { data: 'Some Data' });

    expect(axios.patch).toBeCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith('/test', { data: 'Some Data' });
    expect(axios.patch).toHaveReturnedWith(mockRegisterResponse);
  });

  it('should should throw error for patch method', async () => {
    vi.spyOn(axios, 'patch').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);
    await apiClient.patch('/test', { data: 'Some Data' });

    expect(apiClient.patch).rejects.toThrowError('Something went wrong');
  });

  it('should should throw error for put method', async () => {
    vi.spyOn(axios, 'put').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);
    await apiClient.put('/test', { data: 'Some Data' });

    expect(apiClient.put).rejects.toThrowError('Something went wrong');
  });

  it('should should throw error for post method', async () => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);
    await apiClient.post('/test', { data: 'Some Data' });

    expect(apiClient.post).rejects.toThrowError('Something went wrong');
  });

  it('should should throw error for get method', async () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce(mockRegisterResponse);
    const apiClient = new ApiClient(axios);
    await apiClient.get('/test');

    expect(apiClient.get).rejects.toThrowError('Something went wrong');
  });
});
