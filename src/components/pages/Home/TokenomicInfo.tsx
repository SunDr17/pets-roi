import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';

import { useAppSelector } from '@/store/hooks';
import {
  selectConfig,
  selectIsUserChanged,
  selectUserProfitData,
  selectUserWorkingBalance,
} from '@/store/selectors';
import useInterval from '@/hooks/useInterval';
import useFinishCycle from '@/hooks/tokenomics/useFinishCycle';
import useCalculateCurrentProfit from '@/hooks/tokenomics/useCalculateCurrentProfit';
import useUpdateUserProfitData from '@/hooks/useUpdateUserProfitData';
import { getCurrentProfit } from '@/services/tokenomics';
import Countdown from '@/components/common/Countdown';
import FinishCycleModalButton from '@/components/pages/Home/FinishCycleModalButton';

import './Home.module.css';

export default function TokenomicInfo() {
  const { t } = useTranslation();

  const isUserChanged = useAppSelector(selectIsUserChanged);
  const finishCycle = useFinishCycle();
  const calculateCurrentProfit = useCalculateCurrentProfit();
  const updateUserProfitData = useUpdateUserProfitData();
  const config = useAppSelector(selectConfig);
  const boughtAmount = useAppSelector(selectUserWorkingBalance);
  const userProfitData = useAppSelector(selectUserProfitData);
  const currentProfitPercent = config.currentProfitPercent;
  const cycleDuration = config.cycleDuration;
  const cycleStartTime = userProfitData?.cycleStartDate ?? 0;

  const [nextCycleTimer, setNextCycleTimer] = useState(cycleStartTime + cycleDuration);
  const [profitOnStart, setProfitOnStart] = useState(0);
  const [currentProfit, setCurrentProfit] = useState(profitOnStart);

  useEffect(() => {
    updateUserProfitData();
    getCurrentProfit().then((profit) => {
      setProfitOnStart(profit);
    });
  }, [isUserChanged]);

  useEffect(() => {
    setCurrentProfit(profitOnStart);
  }, [profitOnStart]);

  useEffect(() => {
    setNextCycleTimer(cycleStartTime + cycleDuration);
  }, [userProfitData]);

  useInterval(() => {
    setCurrentProfit(calculateCurrentProfit());
  }, 1000);

  const onFinishCycleButtonClick = async () => {
    await finishCycle();

    setNextCycleTimer(new Date().getTime() + cycleDuration);
    setCurrentProfit(0);
  };

  return (
    <>
      {boughtAmount > 0 && <Container>
        <p>
          {t('bought_amount')}: {boughtAmount} {t('currency')}
        </p>
        <p>
          {t('user_current_percent')}: {currentProfitPercent}%
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
