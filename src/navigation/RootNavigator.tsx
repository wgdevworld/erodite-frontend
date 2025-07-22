import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeMain from '../screens/HomeMain';
import LoginMain from '../screens/LoginMain';
import { RootStackParamList } from './navigation';
import InitialConfigMain from '../screens/InitialConfigMain';
import OnboardingMain from '../screens/OnboardingMain';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialConfigMain">
        <Stack.Screen
          name="InitialConfigMain"
          component={InitialConfigMain}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginMain" component={LoginMain} options={{ headerShown: false }} />
        <Stack.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
        <Stack.Screen
          name="OnboardingMain"
          component={OnboardingMain}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
