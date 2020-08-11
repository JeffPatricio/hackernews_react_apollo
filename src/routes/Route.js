import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => (
        isPrivate === !!user ?
          <Component /> :
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: {
                from: location
              }
            }}
          />
      )}
    />
  )
};

export default Route;
