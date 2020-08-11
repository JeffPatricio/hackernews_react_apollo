import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyles from './styles/global';
import GraphQLConfig from './graphql';

const App = () => {
  return (
    <BrowserRouter>
      <GraphQLConfig>
        <AppProvider>
          <Routes />
          <GlobalStyles />
        </AppProvider>
      </GraphQLConfig>
    </BrowserRouter>
  );
}

export default App;
