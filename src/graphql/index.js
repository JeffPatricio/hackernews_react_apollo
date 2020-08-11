import React from 'react';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SERVER_HTTP, SERVER_WS } from '../config';

const authToken = localStorage.getItem('@hackernews:token');

const wsLink = new WebSocketLink({
  uri: SERVER_WS,
  options: {
    reconnect: true,
    connectionParams: {
      authToken
    }
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : ''
    }
  };
});

const httpLink = createHttpLink({
  uri: SERVER_HTTP
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const GraphQLConfig = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default GraphQLConfig;