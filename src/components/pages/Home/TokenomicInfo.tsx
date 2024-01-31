import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';

import config from '@/config';
import { useAppSelector } from '@/store/hooks';
import { selectUser, selectUserWorkingBalance } from '@/store/selectors';
import useInterval from '@/hooks/useInterval';
import useFinishCycle from '@/hooks/tokenomics/useFinishCycle';
import useGetCurrentProfitPercent from '@/hooks/tokenomics/useGetCurrentProfitPercent';
import useCalculateCurrentProfit from '@/hooks/tokenomics/useCalculateCurrentProfit';
import Countdown from '@/components/common/Countdown';
import FinishCycleModalButton from '@/components/pages/Home/FinishCycleModalButton';

import './Home.module.css';

export default function TokenomicInfo() {
  const { t } = useTranslation();

  const finishCycle = useFinishCycle();
  const currentUser = useAppSelector(selectUser)!;
  const currentProfitPercent = useGetCurrentProfitPercent();
  const calculateCurrentProfit = useCalculateCurrentProfit();
  const boughtAmount = useAppSelector(selectUserWorkingBalance);
  const cycleStartTime = currentUser.cycleStartTime
    ? new Date(currentUser.cycleStartTime).getTime()
    : 0;

  const [nextCycleTimer, setNextCycleTimer] = useState(cycleStartTime + config.cycleDuration);
  const [currentProfit, setCurrentProfit] = useState(calculateCurrentProfit());

  useInterval(() => {
    setCurrentProfit(calculateCurrentProfit());
  }, 1000);

  const onFinishCycleButtonClick = async () => {
    await finishCycle(currentProfit);

    setNextCycleTimer(new Date().getTime() + config.cycleDuration);
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
