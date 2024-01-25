import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { useAppDispatch } from '@/store/hooks';
import { hideModal, showModal } from '@/store/global-slice';

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
      size: 'sm',
      onConfirm,
      header: t('finish_cycle_modal.header'),
      body: t('finish_cycle_modal.body'),
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