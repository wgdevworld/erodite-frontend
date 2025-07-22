import React, { createContext, useContext, useState } from 'react';
import { GENDER_ENUM } from '../types/store';

type OnboardingContextType = {
  gender: GENDER_ENUM | null;
  setGender: (gender: GENDER_ENUM) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gender, setGender] = useState<GENDER_ENUM | null>(null);

  return (
    <OnboardingContext.Provider value={{ gender, setGender }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
