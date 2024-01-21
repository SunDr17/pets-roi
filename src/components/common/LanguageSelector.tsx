import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

import i18n from '@/services/i18n';

export default function LanguageSelector() {
  const { t } = useTranslation();
  const languages = ['ru', 'en'];

  const changeLanguageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Form.Select onChange={(event) => changeLanguageSelect(event)}>
      {languages.map((lang) => (
        <option key={lang} value={lang} selected={i18n.language === lang}>
          {t(`language.${lang}`)}
        </option>
      ))}
    </Form.Select>
  );
}
