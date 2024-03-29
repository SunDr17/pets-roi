import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';

import config from '@/config';
import { addProfitToBalanceLocal } from '@/store/global-slice';
import { useAppDispatch } from '@/store/hooks';
import useInterval from '@/hooks/useInterval';
import {
  addProfitToBalance,
  calculateCurrentProfit,
  getCurrentBalance,
  getCurrentProfitPercent,
  getCycleStartTime,
  setCycleStartTime,
  WORKING_BALANCE_KEY,
} from '@/services/tokenomics';
import Countdown from '@/components/common/Countdown';

import './Home.module.css';
import FinishCycleModalButton from '@/components/pages/Home/FinishCycleModalButton';

export default function TokenomicInfo() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const boughtAmount = getCurrentBalance(WORKING_BALANCE_KEY);
  const cycleStartTime = getCycleStartTime();

  const [nextCycleTimer, setNextCycleTimer] = useState(cycleStartTime + config.cycleDuration);
  const [currentProfit, setCurrentProfit] = useState(calculateCurrentProfit());

  useInterval(() => {
    setCurrentProfit(calculateCurrentProfit());
  }, 1000);

  const onFinishCycleButtonClick = () => {
    addProfitToBalance(currentProfit);
    dispatch(addProfitToBalanceLocal(currentProfit));
    setNextCycleTimer(new Date().getTime() + config.cycleDuration);
    setCurrentProfit(0);
    setCycleStartTime(new Date().getTime());
  };

  return (
    <>
      {boughtAmount > 0 && <Container>
        <p>
          {t('bought_amount')}: {boughtAmount} {t('currency')}
        </p>
        <p>
          {t('user_current_percent')}: {getCurrentProfitPercent()}%
        </p>
        <p>
          {t('homepage.user_current_profit')}: {currentProfit.toFixed(4)} {t('currency')}
        </p>
        <p>
          {t('homepage.timer')}:{' '}
          {<Countdown timer={nextCycleTimer} completeText={t('completeCountdownText')} />}
        </p>
        <FinishCycleModalButton onFinishCycle={onFinishCycleButtonClick} />
      </Container>}
    </>
  );
}
