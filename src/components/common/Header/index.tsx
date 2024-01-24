import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useAppSelector } from '@/store/hooks';
import { selectUserCurrentBalance } from '@/store/selectors';
import ConnectWallet from '@/components/common/web3/Wallet';
import LanguageSelector from '@/components/common/LanguageSelector';
import TopUpModalButton from '@/components/pages/Home/TopUpModalButton';

import styles from './Header.module.css';

export default function Header() {
  const { t } = useTranslation();
  const userCurrentBalance = useAppSelector(selectUserCurrentBalance);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <img className={styles.logo} alt="PetsROI" src={process.env.PUBLIC_URL + '/images/logo.svg'} />
          </LinkContainer>
          <div className={styles.userBalance}>
            {t('menu.balance', { count: userCurrentBalance })}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.menu}>
          <Nav className="m-auto">
            <LinkContainer to="/">
              <Nav.Link>{t('inventory')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>{t('menu.shop')}</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <TopUpModalButton />
            <ConnectWallet />
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <LanguageSelector />
        </Nav>
      </Container>
    </Navbar>
  );
}
