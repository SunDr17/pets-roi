import axios, { AxiosHeaders } from 'axios';

import { ApiResponse } from '@/types/ApiClientType';
import { USER_HASH_LOCAL } from '@/types/UserType';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_PATH}/api/`,
});

const baseResponse: ApiResponse = {
  data: null,
  error: null,
  response: null,
};

function setCommonAuthHeader() {
  if (localStorage.getItem(USER_HASH_LOCAL)) {
    client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(USER_HASH_LOCAL)}`;
  } else {
    delete client.defaults.headers.common['Authorization'];
  }
}

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
  } catch (error: any) {
    baseResponse.error = performError(error);
    baseResponse.response = error.response;
  }
  return baseResponse;
}

async function getById(path: string, id: string) {
  try {
    baseResponse.data = await client.get(`${path}/${id}`);
  } catch (error: any) {
    baseResponse.error = performError(error);
    baseResponse.response = error.response;
  }
  return baseResponse;
}

async function add(path: string, data?: any, headers?: AxiosHeaders) {
  try {
    baseResponse.data = await client.put(path, data, { headers });
  } catch (error: any) {
    baseResponse.error = performError(error);
    baseResponse.response = error.response;
  }
  return baseResponse;
}

export { setCommonAuthHeader, list, getById, add };
