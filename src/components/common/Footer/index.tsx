import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

import config from '@/config';
import Icon from '@/components/common/Icon';
import TopUpModalButton from '@/components/pages/Home/TopUpModalButton';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-top mt-auto">
      <Navbar>
        <Container>
          <Nav className="m-auto flex-wrap">
            <TopUpModalButton text={t('menu.buy_tokens')} />
            <LinkContainer to="/">
              <Nav.Link>{t('inventory')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>{t('menu.shop')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ref-program">
              <Nav.Link>{t('menu.ref_program')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tokenomics">
              <Nav.Link>{t('menu.tokenomics')}</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {Object.keys(config.socialLinks).map((social) => (
              <Nav.Link key={social} href={config.socialLinks[social]} target="_blank">
                <Icon name={social} />
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
}
