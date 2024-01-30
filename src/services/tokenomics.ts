// TODO: replace localStorage with BE DB
import { UserType } from '@/types/UserType';
import { add } from '@/services/api/client';

export function getCycleStartTime() {
  return Number(localStorage.getItem('cycleStartTime'));
}

export function setCycleStartTime(cycleStartTime: number | string | Date) {
  localStorage.setItem('cycleStartTime', JSON.stringify(cycleStartTime));
}

export async function finishCycle(profit: number): Promise<UserType | null> {
  const response = await add('tokenomics/finish-cycle', { profit: profit });

  return response.data?.data;
}
