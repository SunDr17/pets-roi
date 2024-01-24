import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  type BaseError,
  useSendTransaction,
} from 'wagmi';
import { parseEther } from 'viem';
import Button from 'react-bootstrap/Button';

type Props = {
  transactionSum: number;
  buttonTextPrefix?: string;
};

export default function SendTransactionButton({
  transactionSum,
  buttonTextPrefix = 'ref_program.referral_balance.withdraw_button',
}: Props) {
  const { t } = useTranslation();
  const {
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function sendTransactionClick() {
    sendTransaction({
      to: process.env.REACT_APP_WEB3_WALLET_BASE_ADDRESS as `0x${string}`,
      value: parseEther(String(transactionSum)),
    });
  }

  return (
    <>
      <Button className="mb-3" variant="primary" disabled={isPending} onClick={sendTransactionClick}>
        {t(`${buttonTextPrefix}.${isPending ? 'confirming' : 'confirm'}`)}
      </Button>
      {error && (
        <div className="text-danger">
          {t(
            'ref_program.referral_balance.withdraw_button.error.label',
            { error: t((error as BaseError).shortMessage || error.message) },
          )}
        </div>
      )}
    </>
  );
}
