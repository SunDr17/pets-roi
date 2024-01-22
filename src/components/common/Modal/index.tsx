import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import BootstrapModal from 'react-bootstrap/Modal';

import { ModalType } from '@/types/ModalType';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectModal } from '@/store/selectors';
import { hideModal } from '@/store/global-slice';

function Modal(props: ModalType) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  if (!modal?.show) {
    return null;
  }

  const modalProps: ModalType = { ...props, ...modal };

  const onHide = () => {
    dispatch(hideModal());
    if (modalProps.onHide) modalProps.onHide();
  };

  return (
    <BootstrapModal
      {...props}
      show={modal.show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {modalProps.header && <BootstrapModal.Header closeButton>
        <BootstrapModal.Title id="contained-modal-title-vcenter">
          {modalProps.header}
        </BootstrapModal.Title>
      </BootstrapModal.Header>}
      {modalProps.body && <BootstrapModal.Body>
        {modalProps.body}
      </BootstrapModal.Body>}
      <BootstrapModal.Footer>
        {modalProps.onConfirm && <Button onClick={modalProps.onConfirm}>
          {modalProps.confirmText ?? t('modal_default.confirm')}
        </Button>}
        {modalProps.onHide && <Button onClick={modalProps.onHide}>
          {modalProps.closeText ?? t('modal_default.hide')}
        </Button>}
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

export default memo(Modal);