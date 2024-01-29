export const USER_HASH_LOCAL = 'user_hash';

export type Hash = `0x${string}` | undefined;

export interface UserType {
  _id: string;
  walletAddress: string;
  balance: number;
  workingBalance: number;
}
