import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  type BaseError,
  useSendTransaction,
} from 'wagmi';
import { parseEther } from 'viem';
import Button from 'react-bootstrap/Button';

export default function WithdrawButton({ withdrawSum }: { withdrawSum: number }) {
  const { t } = useTranslation();
  const {
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function withdraw() {
    sendTransaction({
      to: process.env.REACT_APP_WEB3_WALLET_BASE_ADDRESS as `0x${string}`,
      value: parseEther(String(withdrawSum)),
    });
  }

  return (
    <>
      <Button className="mb-3" variant="primary" disabled={isPending} onClick={withdraw}>
        {t(`ref_program.referral_balance.withdraw_button.${isPending ? 'confirming' : 'withdraw'}`)}
      </Button>
      {error && (
        <div className="text-danger">
          {t(
            'ref_program.referral_balance.withdraw_button.error.label',
            { error: t(`web3.error.${(error as BaseError).shortMessage || error.message}`) },
          )}
        </div>
      )}
    </>
  );
}
