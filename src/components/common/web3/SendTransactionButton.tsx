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
  className?: string;
  onConfirm?: () => void;
};

export default function SendTransactionButton({
  transactionSum,
  buttonTextPrefix = 'ref_program.referral_balance.withdraw_button',
  className = 'mb-3',
  onConfirm,
}: Props) {
  const { t } = useTranslation();
  const {
    error,
    isPending,
    sendTransactionAsync,
  } = useSendTransaction();

  async function sendTransactionClick() {
    await sendTransactionAsync({
      to: process.env.REACT_APP_WEB3_WALLET_BASE_ADDRESS as `0x${string}`,
      value: parseEther(String(transactionSum)),
    });

    if (onConfirm) {
      onConfirm();
    }
  }

  return (
    <>
      <Button className={className} variant="primary" disabled={isPending} onClick={sendTransactionClick}>
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
