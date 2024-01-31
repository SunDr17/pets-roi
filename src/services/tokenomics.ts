import { UserType } from '@/types/UserType';
import { add } from '@/services/api/client';

export async function finishCycle(profit: number): Promise<UserType | null> {
  const response = await add('tokenomics/finish-cycle', { profit: profit });

  return response.data?.data;
}
