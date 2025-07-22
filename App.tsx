/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootNavigator from './src/navigation/RootNavigator';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './src/api/client';
import AppProviders from './src/context/Providers';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AppProviders>
        <RootNavigator />
      </AppProviders>
    </ApolloProvider>
  );
};

export default App;
