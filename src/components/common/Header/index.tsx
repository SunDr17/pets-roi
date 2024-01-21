import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

import LanguageSelector from '@/components/common/LanguageSelector';

import styles from './Header.module.css';

export default function Header() {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <LinkContainer to="/">
            <img className={styles.logo} alt="PetsROI" src={process.env.PUBLIC_URL + '/images/logo.svg'} />
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>{t('inventory')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>{t('shop')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ref_program">
              <Nav.Link>{t('ref_program')}</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Button />
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <LanguageSelector />
        </Nav>
      </Container>
    </Navbar>
  );
}
