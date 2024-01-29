export const USER_HASH = 'user_hash';

export function setUserHashLocal(hash: `0x${string}` | undefined) {
  if (hash) {
    localStorage.setItem(USER_HASH, hash);
  } else {
    localStorage.removeItem(USER_HASH);
  }
}
