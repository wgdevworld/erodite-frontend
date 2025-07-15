/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootNavigator from './src/navigation/RootNavigator';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './src/api/client';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <RootNavigator />
    </ApolloProvider>
  );
};

export default App;
