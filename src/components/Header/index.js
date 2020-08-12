import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import iconSrc from '../../assets/icon.png';
import { Container, ContainerLogin, ContainerNavigation, Separator, Logo, Title } from './styles';

const Header = ({ location }) => {

  const { authToken, signOut } = useAuth();
  const isLoginPage = location.pathname.includes('login');

  return (
    <Container>
      <ContainerNavigation>
        <Logo src={iconSrc} onClick={() => window.location.reload(false)} />
        <Title onClick={() => window.location.reload(false)}>Hacker News</Title>
        <Link to='/'>news</Link>
        <Separator />
        <Link to='/top'>top</Link>
        <Separator />
        <Link to='/search'>search</Link>
        {
          authToken &&
          <Fragment>
            <Separator />
            <Link to='/create'>submit</Link>
          </Fragment>
        }
      </ContainerNavigation>
      <ContainerLogin>
        {
          !isLoginPage && authToken &&
          <Link to='/' onClick={signOut}>
            logout
          </Link>
        }
        {
          !isLoginPage && !authToken &&
          <Link to='/login'>
            login
          </Link>
        }
      </ContainerLogin>
    </Container>
  );
}

export default Header;