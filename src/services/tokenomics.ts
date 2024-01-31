import { ConfigType } from '@/types/ConfigType';
import { UserType } from '@/types/UserType';
import { add, get } from '@/services/api/client';

export async function getConfig(): Promise<ConfigType | null> {
  const response = await get('tokenomics/config');

  return response.data?.data;
}

export async function finishCycle(profit: number): Promise<UserType | null> {
  const response = await add('tokenomics/finish-cycle', { profit: profit });

  return response.data?.data;
}
