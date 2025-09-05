import React, { createContext, Dispatch, JSX, SetStateAction, useContext, useState } from 'react';
import { CURIOUS_TOPICS_ENUM, GENDER_ENUM, INSTALL_INTENT_ENUM } from '../types/store';
import OnboardingBirthdayPage from '../components/Onboarding/OnboardingBirthdayPage';
import OnboardingIntentPage from '../components/Onboarding/OnboardingIntentPage';
import OnboardingCuriosityPage from '../components/Onboarding/OnboardingCuriosityPage';
import OnboardingNotificationPage from '../components/Onboarding/OnboardingNotificationPage';
import OnboardingGenderPage from '../components/Onboarding/OnboardingGenderPage';

type OnboardingContextType = {
  onboardingPages: OnboardingPage[];
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

enum ONBOARDING_PAGE_ENUM {
  BIRTHDAY = 'birthday',
  GENDER = 'gender',
  NICKNAME = 'nickname',
  INTENT = 'intent',
  CURIOSITY = 'curiosity',
  NOTIFICATIONS = 'notifications',
}

export type OnboardingPage = {
  page: ONBOARDING_PAGE_ENUM;
  component: JSX.Element;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [curPage, setCurPage] = useState(0);
  const [gender, setGender] = useState<GENDER_ENUM | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<INSTALL_INTENT_ENUM[]>([]);
  const [topicOrder, setTopicOrder] = useState<CURIOUS_TOPICS_ENUM[]>([]);

  const onboardingPages: OnboardingPage[] = [
    { page: ONBOARDING_PAGE_ENUM.BIRTHDAY, component: <OnboardingBirthdayPage /> },
    {
      page: ONBOARDING_PAGE_ENUM.GENDER,
      component: <OnboardingGenderPage />,
    },
    { page: ONBOARDING_PAGE_ENUM.INTENT, component: <OnboardingIntentPage /> },
    { page: ONBOARDING_PAGE_ENUM.CURIOSITY, component: <OnboardingCuriosityPage /> },
    { page: ONBOARDING_PAGE_ENUM.NOTIFICATIONS, component: <OnboardingNotificationPage /> },
  ];

  const onPressBack = () => {
    setCurPage((prev) => Math.max(0, prev - 1));
  };

  const onPressNext = () => {
    setCurPage((prev) => Math.min(prev + 1, onboardingPages.length - 1));
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingPages,
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
