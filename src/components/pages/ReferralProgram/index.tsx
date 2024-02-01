import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useAppSelector } from '@/store/hooks';
import { selectConfig } from '@/store/selectors';
import {
  getReferralLink,
  getReferralBalance,
  getReferralPartnersQuantity,
} from '@/services/data/referral';
import { CURRENCIES, exchangeRates } from '@/services/currencies';
import SendTransactionButton from '@/components/common/web3/SendTransactionButton';

export default function ReferralProgram() {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const currencyInBNB = useAppSelector(selectConfig).currencyInBNB;
  const { convertCurrencies } = exchangeRates(currencyInBNB);
  const referralLink = getReferralLink();
  const referralBalance = getReferralBalance();
  const referralBalanceInBnb = convertCurrencies(
    CURRENCIES.PRIMARY_CURRENCY,
    CURRENCIES.BNB,
    referralBalance,
  ).amount;
  const partnersQuantity = getReferralPartnersQuantity();

  const copyToClipboard = () => {
    if (!isCopied) {
      navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  }

  return (
    <Container className="text-center">
      <p className="display-6 mb-3">{t('ref_program.header')}</p>
      <div className="mb-4">
        <Form.Group className="mb-3 col-lg-5 col-md-8 col-sm-12 mx-auto">
          <Form.Label>{t('ref_program.your_link')}</Form.Label>
          <Form.Control className="m-auto" type="text" disabled value={referralLink} />
        </Form.Group>
        <Button className="w-auto" variant="primary" onClick={copyToClipboard}>
          {t(!isCopied ? 'ref_program.copy_button' : 'ref_program.copied_button')}
        </Button>
      </div>
      <div>
        <p className="display-6">{t('ref_program.referral_balance.header')}</p>
        <p>{t('ref_program.referral_balance.count_people', { countPeople: partnersQuantity })}</p>
        <p>
          {t('ref_program.referral_balance.balance', {
            countPrimary: Number(referralBalance.toFixed(2)),
            countSecondary: Number(referralBalanceInBnb.toFixed(6)),
            secondaryCurrency: t(`currencies.${CURRENCIES.BNB}`),
          })}
        </p>
        <SendTransactionButton transactionSum={Number(referralBalanceInBnb.toFixed(6))} />
      </div>
    </Container>
  );
}
