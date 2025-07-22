import React, { FC, ReactNode } from 'react';
import { OnboardingProvider } from './OnboardingContext';
// import other providers here as needed

const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <OnboardingProvider>{children}</OnboardingProvider>;
};

export default AppProviders;
