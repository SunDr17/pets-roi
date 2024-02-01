import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import cn from 'classnames';

import { useAppDispatch } from '@/store/hooks';
import { hideModal, showModal } from '@/store/global-slice';

import styles from './Home.module.css';

type Props = {
  onFinishCycle: () => void;
};

function FinishCycleModalButton({ onFinishCycle }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    onFinishCycle();
    dispatch(hideModal());
  };

  const openModal = () => {
    dispatch(showModal({
      onConfirm,
      header: t('finish_cycle_modal.header'),
      body: (
        <div className={cn(styles['finish-cycle-modal-body'], 'text-center')}>
          <img alt="" src={process.env.PUBLIC_URL + '/images/finish-cycle-modal-img.png'} />
          <p className="display-8">{t('finish_cycle_modal.body')}</p>
        </div>
      ),
      confirmText: t('finish_cycle_modal.confirm'),
    }));
  };

  return (
    <Button className="mb-4" onClick={openModal}>
      {t('homepage.finish_cycle_button')}
    </Button>
  );
}

export default memo(FinishCycleModalButton);