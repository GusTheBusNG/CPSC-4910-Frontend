import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://driver-incentive.herokuapp.com/v1/graphql',
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_DATABASE_AUTH_TOKEN,
    'Accept-Encoding': 'gzip'
  }
});

export default client;