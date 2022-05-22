import type { AppProps } from 'next/app';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import FavoritesProvider from '../providers/FavoritesProvider';
import ToastProvider from '../providers/ToastProvider';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

const API_URI = 'http://localhost:4000/graphiql';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const link = createHttpLink({
    uri: API_URI,
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <FavoritesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FavoritesProvider>
      </ToastProvider>
    </ApolloProvider>
  );
};

export default MyApp;
