import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="align-content-center justify-content-center">
      <div className="display-4">{t('not_found.header')}</div>
      <div>{t('not_found.content')}</div>
    </div>
  );
}