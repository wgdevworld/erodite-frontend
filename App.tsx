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
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <GestureHandlerRootView>
        <AppProviders>
          <RootNavigator />
        </AppProviders>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
};

export default App;
