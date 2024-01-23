export const USER_REFERRAL_CODE = 'user_referral_code';

const generateRandomHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export function setReferralCode(code: string) {
  localStorage.setItem(USER_REFERRAL_CODE, code);
}

export function getReferralCode() {
  // TODO: generate referral code on BE
  let refCode = localStorage.getItem(USER_REFERRAL_CODE);

  if (!refCode) {
    refCode = generateRandomHex(32);
    setReferralCode(refCode);
  }

  return refCode;
}

export function getReferralLink() {
  const code = getReferralCode();
  return `${window.location.origin}${window.location.pathname}?ref_code=${code}`;
}

export function getReferralBalance() {
  // TODO: get value from BE
  return 12350;
}
