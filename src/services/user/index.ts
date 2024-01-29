import { AxiosResponse } from 'axios';

import { Hash, USER_HASH_LOCAL, UserType } from '@/types/UserType';
import { add, setCommonAuthHeader } from '@/services/api/client';

export function getUserHashLocal() {
  return localStorage.getItem(USER_HASH_LOCAL);
}

export function setUserHashLocal(hash: Hash) {
  if (hash) {
    localStorage.setItem(USER_HASH_LOCAL, hash);
  } else {
    localStorage.removeItem(USER_HASH_LOCAL);
  }
  setCommonAuthHeader();
}

export async function registerUser(address: Hash): Promise<AxiosResponse<UserType> | null> {
  const response = await add('users/register', { hash: address });

  if (response.error && response.response?.status === 409) {
    return response.response.data;
  }

  return response.data?.data;
}
