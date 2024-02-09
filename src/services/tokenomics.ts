import { ConfigType } from '@/types/ConfigType';
import { UserType } from '@/types/UserType';
import { UserProfitType } from '@/types/UserProfitType';
import { add, get } from '@/services/api/client';

export async function getConfig(): Promise<ConfigType | null> {
  const response = await get('tokenomics/config');

  return response.data?.data;
}

export async function getUserProfit(): Promise<UserProfitType> {
  const response = await get('tokenomics/user-profit');

  return response.data?.data;
}

export async function getCurrentProfit(): Promise<number> {
  const response = await get('tokenomics/current-profit');

  return response.data?.data;
}

export async function finishCycle(): Promise<UserType | null> {
  const response = await add('tokenomics/finish-cycle');

  return response.data?.data;
}
