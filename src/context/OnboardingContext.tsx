import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { CURIOUS_TOPICS_ENUM, GENDER_ENUM, INSTALL_INTENT_ENUM } from '../types/store';

type OnboardingContextType = {
  curPage: number;
  setCurPage: (page: number) => void;
  onPressBack: () => void;
  onPressNext: () => void;

  gender: GENDER_ENUM | null;
  setGender: (gender: GENDER_ENUM) => void;
  dateOfBirth: Date | null;
  setDateOfBirth: (date: Date) => void;
  selectedIntent: INSTALL_INTENT_ENUM[];
  setSelectedIntent: Dispatch<SetStateAction<INSTALL_INTENT_ENUM[]>>;
  topicOrder: CURIOUS_TOPICS_ENUM[];
  setTopicOrder: Dispatch<SetStateAction<CURIOUS_TOPICS_ENUM[]>>;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [curPage, setCurPage] = useState(0);
  const [gender, setGender] = useState<GENDER_ENUM | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<INSTALL_INTENT_ENUM[]>([]);
  const [topicOrder, setTopicOrder] = useState<CURIOUS_TOPICS_ENUM[]>([]);

  const onPressBack = () => {
    setCurPage((prev) => Math.max(0, prev - 1));
  };

  const onPressNext = () => {
    setCurPage((prev) => prev + 1);
  };

  return (
    <OnboardingContext.Provider
      value={{
        curPage,
        setCurPage,
        onPressBack,
        onPressNext,
        gender,
        dateOfBirth,
        topicOrder,
        selectedIntent,
        setGender,
        setDateOfBirth,
        setSelectedIntent,
        setTopicOrder,
      }}
    >
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
