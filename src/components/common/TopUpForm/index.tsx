import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputGroup, Form, Stack } from 'react-bootstrap';

import { useAppDispatch } from '@/store/hooks';
import { addProfitToBalanceLocal, hideModal } from '@/store/global-slice';

import { topUpBalance } from '@/services/tokenomics';
import { EXCHANGE_RATES, convertCurrencies } from '@/services/currencies';
import SendTransactionButton from '@/components/common/web3/SendTransactionButton';

type Props = {
  primaryCurrency: string,
  secondaryCurrency: string,
};

const TopUpForm = ({ primaryCurrency, secondaryCurrency }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [inputValues, setInputValues] = useState({
    primary: 0,
    secondary: 0,
  })

  const onChangePrimaryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) || 0;
    const convertedValue = convertCurrencies(primaryCurrency, secondaryCurrency, value);

    setInputValues({
      primary: value,
      secondary: convertedValue.amount,
    });
  };

  const onChangeSecondaryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) || 0;
    const convertedValue = convertCurrencies(secondaryCurrency, primaryCurrency, value);

    setInputValues({
      primary: convertedValue.amount,
      secondary: value,
    });
  };

  const onConfirmTopUp = () => {
    if (!inputValues.primary) return null;

    topUpBalance(inputValues.primary);
    dispatch(addProfitToBalanceLocal(inputValues.primary));

    setInputValues({
      primary: 0,
      secondary: 0,
    });

    dispatch(hideModal());
  };

  return (
    <>
      <p>{t('top_up.exchange_rates_info', {
        primaryCurrency: t(`currencies.${primaryCurrency}`),
        secondaryCurrency: t(`currencies.${secondaryCurrency}`),
        amount: EXCHANGE_RATES[secondaryCurrency][primaryCurrency],
      })}</p>
      <Stack direction="horizontal" gap={3}>
        <InputGroup className="mb-3">
          <InputGroup.Text>{t(`currencies.${primaryCurrency}`)}</InputGroup.Text>
          <Form.Control
            onChange={onChangePrimaryInput}
            value={inputValues.primary}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>{t(`currencies.${secondaryCurrency}`)}</InputGroup.Text>
          <Form.Control
            onChange={onChangeSecondaryInput}
            value={inputValues.secondary}
          />
        </InputGroup>
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <Form.Label>{t('top_up.message', { amount: inputValues.primary })}</Form.Label>
        <SendTransactionButton
          className="p-2 ms-auto btn-success"
          buttonTextPrefix="top_up.submit_button"
          onConfirm={onConfirmTopUp}
          transactionSum={inputValues.secondary}
        />
      </Stack>
    </>
  );
};

export default TopUpForm;
