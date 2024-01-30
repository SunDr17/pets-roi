import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputGroup, Form, Stack } from 'react-bootstrap';

import config from '@/config';
import { useAppDispatch } from '@/store/hooks';
import { addProfitToBalanceLocal, hideModal } from '@/store/global-slice';

import { topUpBalance } from '@/services/tokenomics';
import { EXCHANGE_RATES, convertCurrencies } from '@/services/currencies';
import SendTransactionButton from '@/components/common/web3/SendTransactionButton';

type Props = {
  primaryCurrency: string,
  secondaryCurrency: string,
};

const DEFAULT_DECIMAL_PRECISION = 8;

const createMask = (currency: string): RegExp => {
  const dP = config.decimalPrecision[currency] || DEFAULT_DECIMAL_PRECISION;

  return new RegExp(`^(0(\\.\\d{0,${dP}})?)?$|^[1-9]\\d*\\.?\\d{0,${dP}}$`);
}

const TopUpForm = ({ primaryCurrency, secondaryCurrency }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [inputValues, setInputValues] = useState({
    primary: '',
    secondary: '',
  });

  const primaryInputMask = useMemo(() => {
    return createMask(primaryCurrency);
  }, [primaryCurrency]);

  const secondaryInputMask = useMemo(() => {
    return createMask(secondaryCurrency);
  }, [secondaryCurrency]);

  const onChangePrimaryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!primaryInputMask.test(event.target.value)) return;

    const value = parseFloat(event.target.value);
    const convertedValues = convertCurrencies(primaryCurrency, secondaryCurrency, value);

    setInputValues({
      primary: event.target.value,
      secondary: convertedValues.amount.toString(),
    });
  };

  const onChangeSecondaryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!secondaryInputMask.test(event.target.value)) return;

    const value = parseFloat(event.target.value);
    const convertedValues = convertCurrencies(secondaryCurrency, primaryCurrency, value);

    setInputValues({
      primary: convertedValues.amount.toString(),
      secondary: event.target.value,
    });
  };

  const onConfirmTopUp = () => {
    const sum = parseFloat(inputValues.primary);
    if (!sum) return null;

    topUpBalance(sum);
    dispatch(addProfitToBalanceLocal(sum));

    setInputValues({
      primary: '',
      secondary: '',
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
        <Form.Label>{t('top_up.message', { amount: inputValues.primary || 0 })}</Form.Label>
        <SendTransactionButton
          className="p-2 ms-auto btn-success"
          buttonTextPrefix="top_up.submit_button"
          onConfirm={onConfirmTopUp}
          transactionSum={parseFloat(inputValues.secondary)}
        />
      </Stack>
    </>
  );
};

export default TopUpForm;
