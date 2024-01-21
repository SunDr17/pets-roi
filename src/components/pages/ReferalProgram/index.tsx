import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ReferalProgram() {
  const { t } = useTranslation();

  return (
    <div>{t('ref_program')}</div>
  );
}
