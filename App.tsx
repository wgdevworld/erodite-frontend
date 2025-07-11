/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootNavigator from './src/navigation/RootNavigator';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/api/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  );
};

export default App;
