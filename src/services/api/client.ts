import axios, { AxiosResponse, AxiosHeaders } from 'axios';

import { ApiResponse } from '@/types/ApiClientType';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_PATH}/api/`,
});

const baseResponse: ApiResponse = {
  data: null,
  error: null,
};

function performError(error: any): string {
  if (axios.isAxiosError(error)) {
    return error.message;
  } else {
    return 'An unexpected error occurred';
  }
}

async function list(path: string) {
  try {
    baseResponse.data = await client.get(path);
  } catch (error) {
    baseResponse.error = performError(error);
  }
  return baseResponse;
}

async function getById(path: string, id: string) {
  try {
    baseResponse.data = await client.get(`${path}/${id}`);
  } catch (error) {
    baseResponse.error = performError(error);
  }
  return baseResponse;
}


async function add(path: string, data: any, headers?: AxiosHeaders) {
  try {
    const response: AxiosResponse = await client.post(path, data, { headers });
    return response;
  } catch (error) {
    baseResponse.error = performError(error);
  }
  return baseResponse;
}

export { list, getById, add };
