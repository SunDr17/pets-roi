import { Hash, USER_HASH_LOCAL, UserType } from '@/types/UserType';
import { update, get, setCommonAuthHeader } from '@/services/api/client';

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

export async function registerUser(address: Hash): Promise<UserType | null> {
  const response = await update('users/register', { hash: address });

  if (response.error && response.response?.status === 409) {
    return response.response.data;
  }

  return response.data?.data;
}

export async function getCurrentUser(): Promise<UserType | null> {
  const response = await get('users/current');

  return response.data?.data;
}

export async function topUpUserBalance(topUpSum: number): Promise<UserType | null> {
  const response = await update('users/top-up', { topUpSum: topUpSum });

  return response.data?.data;
}
