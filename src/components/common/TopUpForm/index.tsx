import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, InputGroup, Form, Stack } from 'react-bootstrap';

import { useAppDispatch } from '@/store/hooks';
import { addProfitToBalanceLocal } from '@/store/global-slice';

import { topUpBalance } from '@/services/tokenomics';
import { convertCurrencies  } from '@/services/currencies';

type Props = {
    firstCurrency: string,
    secondCurrency: string,
};

const TopUpForm = ({ firstCurrency, secondCurrency }: Props) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(0);

    const onChangeFirstInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value) || 0;
        const convertedValue = convertCurrencies(firstCurrency, secondCurrency, value);

        setFirstValue(value)
        setSecondValue(convertedValue.amount);
    };

    const onChangeSecondInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value) || 0;
        const convertedValue = convertCurrencies(secondCurrency, firstCurrency, value);

        setFirstValue(convertedValue.amount);
        setSecondValue(value);
    };

    const onConfirmTopUp = () => {
        if (!firstValue) return null;

        topUpBalance(firstValue);
        dispatch(addProfitToBalanceLocal(firstValue));

        setFirstValue(0);
        setSecondValue(0);
    };

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>{t(`currencies.${firstCurrency}`)}</InputGroup.Text>
                    <Form.Control
                        onChange={onChangeFirstInput}
                        value={firstValue}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>{t(`currencies.${secondCurrency}`)}</InputGroup.Text>
                    <Form.Control
                        onChange={onChangeSecondInput}
                        value={secondValue}
                    />
                </InputGroup>
            </Stack>
            <Stack direction="horizontal" gap={3}>
                <Form.Label>{t('top_up.message', { amount: firstValue })}</Form.Label>
                <Button className="p-2 ms-auto btn-success" onClick={onConfirmTopUp}>
                    {t('top_up.submit_button')}
                </Button>
            </Stack>
        </>
    );
};

export default TopUpForm;
