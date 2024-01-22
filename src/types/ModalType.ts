import React from 'react';
import { ModalProps } from 'react-bootstrap/Modal';

export interface ModalType extends ModalProps {
  header?: string;
  closeText?: string;
  confirmText?: string;
  body?: React.ReactNode;
  onConfirm?: () => void;
}
