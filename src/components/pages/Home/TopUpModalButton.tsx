import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Nav } from 'react-bootstrap';

import { useAppDispatch } from '@/store/hooks';
import { hideModal, showModal } from '@/store/global-slice';

import { CURRENCIES } from '@/services/currencies';
import TopUpForm from '@/components/common/TopUpForm';

function TopUpModalButton({ text }: { text: string }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    dispatch(hideModal());
  };

  const openModal = () => {
    dispatch(showModal({
      onConfirm,
      header: t('menu.buy_tokens'),
      body: (
        <TopUpForm
          primaryCurrency={CURRENCIES.PRIMARY_CURRENCY}
          secondaryCurrency={CURRENCIES.BNB}
        />
      ),
      confirmText: t('top_up.close_modal'),
    }));
  };

  return (
    <Nav.Item>
      <Nav.Link onClick={openModal}>
        {text}
      </Nav.Link>
    </Nav.Item>
  );
}

export default memo(TopUpModalButton);
