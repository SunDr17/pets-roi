import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-content-center justify-content-center">
      <div className="display-3">{t('not_found.header')}</div>
      <div>{t('not_found.content')}</div>
    </div>
  );
}