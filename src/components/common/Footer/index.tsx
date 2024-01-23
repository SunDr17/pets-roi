import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

import config from '@/config';
import Icon from '@/components/common/Icon';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-top mt-auto">
      <Navbar>
        <Container>
          <Nav className="m-auto flex-wrap">
            <LinkContainer to="/">
              <Nav.Link>{t('inventory')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>{t('header.shop')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ref_program">
              <Nav.Link>{t('ref_program')}</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {Object.keys(config.socialLinks).map((social) => (
              <Nav.Link href={config.socialLinks[social]} target="_blank"><Icon name={social} /></Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
}
