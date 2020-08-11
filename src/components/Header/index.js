import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import iconSrc from '../../assets/icon.gif';
import { Container, ContainerLogin, ContainerNavigation, Separator } from './styles';

const Header = () => {

  const { authToken, signOut } = useAuth();

  return (
    <Container>
      <ContainerNavigation>
        <img src={iconSrc} />
        <h4>Hacker News</h4>
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
          authToken &&
          <Link to='/' onClick={signOut}>
            logout
          </Link>
        }
        {
          !authToken &&
          <Link to='/login'>
            login
          </Link>
        }
      </ContainerLogin>
    </Container>
  );
}

export default Header;