import axios, { AxiosHeaders } from 'axios';

import { ApiResponse } from '@/types/ApiClientType';
import { USER_HASH } from '@/services/user';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_PATH}/api/`,
});
if (localStorage.getItem(USER_HASH)) {
  client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(USER_HASH)}`;
}

const baseResponse: ApiResponse = {
  data: null,
  error: null,
  response: null,
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

async function add(path: string, data: any, headers?: AxiosHeaders) {
  try {
    baseResponse.data = await client.put(path, data, { headers });
  } catch (error: any) {
    baseResponse.error = performError(error);
    baseResponse.response = error.response;
  }
  return baseResponse;
}

export { list, getById, add };
