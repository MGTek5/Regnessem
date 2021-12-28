import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { BASE_URL, BASE_WS } from '../constant';

const token = localStorage.getItem("regnessem-token");

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${localStorage.getItem('regnessem-token')}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `${BASE_WS}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: `Bearer ${localStorage.getItem('regnessem-token')}`,
    },
  },
});

const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(res => {
    if (res.errors) {
      res.errors.forEach(error => {
        const code = error.extensions.response.statusCode;
        if (code === 401 || code === 403) {
          window.location = '/logout';
        }
        // TODO handle error 400 & 500 here
      });
    }
    return res;
  })
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: concat(errorLink, splitLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default client;
