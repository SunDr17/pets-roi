import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';

import config from '@/config';

export default function Tokenomics() {
  const { t } = useTranslation();

  return (
    <div className="text-center align-items-center justify-content-center">
      <p className="display-6 mb-3">{t('tokenomics.header')}</p>
      <p>{t('tokenomics.cycle_duration', { duration: config.cycleDuration / (60 * 60 * 1000) })}</p>
      <div className="col-lg-4 col-md-6 mx-auto">
        <Table responsive bordered>
          <thead>
          <tr>
            <th>{t('tokenomics.working_balance')}</th>
            <th>{t('tokenomics.percent')}</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(config.percentsForBoughtBalance).map((balance, index, { length }) => {
            const suffix = length - 1 === index ? t('tokenomics.and_more') : '';
            return (
              <tr key={index}>
                <td>{balance} {suffix}</td>
                <td>{config.percentsForBoughtBalance[balance]}%</td>
              </tr>
            );
          })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
