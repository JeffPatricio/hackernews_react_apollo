import React, { useState, useCallback } from 'react';
import { Mutation } from 'react-apollo';
import { useAuth } from '../../hooks/AuthProvider';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../graphql/mutations';
import Header from '../../components/Header';
import { Container, Title, ContainerForm, Input, Separator, Button, ContainerButtons } from './styles';

const Login = ({ history, location }) => {

  const { signIn } = useAuth();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const confirm = useCallback((data) => {
    const dataUser = login ? data.login : data.signup;
    signIn(dataUser);
    history.push('/');
  }, [history, login]);

  return (
    <Container>
      <Header location={location} />
      <Title>{login ? 'Login' : 'Sign Up'}</Title>
      <ContainerForm>
        {
          !login &&
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        }
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </ContainerForm>
      <ContainerButtons className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => confirm(data)}
          onError={data => alert(data.toString())}
        >
          {mutation => (
            <Button onClick={mutation}>
              {login ? 'Login' : 'Create account'}
            </Button>
          )}
        </Mutation>
        <Separator />
        <Button onClick={() => setLogin(!login)}>
          {login ? 'Need to create an account?' : 'Already have an account?'}
        </Button>
      </ContainerButtons>
    </Container>
  );
}

export default Login;