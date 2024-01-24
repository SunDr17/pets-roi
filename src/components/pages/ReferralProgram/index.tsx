import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { getReferralLink, getReferralBalance } from '@/services/data/referral';
import WithdrawButton from '@/components/common/web3/WithdrawButton';

export default function ReferralProgram() {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const referralLink = getReferralLink();
  const referralBalance = getReferralBalance();

  const copyToClipboard = () => {
    if (!isCopied) {
      navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  }

  return (
    <Container className="text-center">
      <p className="display-6 mb-3">{t('ref_program.header')}</p>
      <div className="mb-4">
        <Form.Group className="mb-3 col-lg-5 col-md-8 col-sm-12 mx-auto">
          <Form.Label>{t('ref_program.your_link')}</Form.Label>
          <Form.Control className="m-auto" type="text" disabled value={referralLink} />
        </Form.Group>
        <Button className="w-auto" variant="primary" onClick={copyToClipboard}>
          {t(!isCopied ? 'ref_program.copy_button' : 'ref_program.copied_button')}
        </Button>
      </div>
      <div>
        <p className="display-6">{t('ref_program.referral_balance.header')}</p>
        <p>{t('ref_program.referral_balance.balance', { count: referralBalance })}</p>
        <WithdrawButton withdrawSum={referralBalance} />
        {/* TODO: remove it, test for secret vars in github */}
        <p>{process.env.REACT_APP_WEB3_PROJECT_ID}</p>
        <p>{process.env.REACT_APP_WEB3_WALLET_BASE_ADDRESS}</p>
      </div>
    </Container>
  );
}
