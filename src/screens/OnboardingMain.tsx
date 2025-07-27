import React, { JSX, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { h, w } from '../styles/globalStyles';
import Icon from '@react-native-vector-icons/ionicons';
import colors from '../styles/colors';
import OnboardingGenderPage from '../components/Onboarding/OnboardingGenderPage';
import OnboardingBirthdayPage from '../components/Onboarding/OnboardingBirthdayPage';
import { useOnboarding } from '../context/OnboardingContext';
import OnboardingIntentPage from '../components/Onboarding/OnboardingIntentPage';
import OnboardingCuriosityPage from '../components/Onboarding/OnboardingCuriosityPage';

enum ONBOARDING_PAGE_ENUM {
  BIRTHDAY = 'birthday',
  GENDER = 'gender',
  NICKNAME = 'nickname',
  INTENT = 'intent',
  CURIOSITY = 'curiosity',
  NOTIFICATIONS = 'notifications',
}

type OnboardingPage = {
  page: ONBOARDING_PAGE_ENUM;
  component: JSX.Element;
};

const OnboardingMain = () => {
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef<FlatList>(null);

  const { curPage, onPressBack } = useOnboarding();

  const onboardingPages: OnboardingPage[] = [
    { page: ONBOARDING_PAGE_ENUM.BIRTHDAY, component: <OnboardingBirthdayPage /> },
    {
      page: ONBOARDING_PAGE_ENUM.GENDER,
      component: <OnboardingGenderPage />,
    },
    { page: ONBOARDING_PAGE_ENUM.INTENT, component: <OnboardingIntentPage /> },
    { page: ONBOARDING_PAGE_ENUM.CURIOSITY, component: <OnboardingCuriosityPage /> },
  ];

  useEffect(() => {
    const totalPages = onboardingPages.length - 1 || 1;
    const progressValue = curPage / totalPages;

    Animated.timing(progress, {
      toValue: progressValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    flatListRef.current?.scrollToIndex({ index: curPage, animated: true });
  }, [curPage]);

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <View style={styles.header}>
        {curPage > 0 ? (
          <TouchableOpacity onPress={onPressBack}>
            <Icon name="chevron-back-outline" size={w(24)} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: w(24) }} />
        )}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <View style={{ width: w(24) }} />
      </View>

      <FlatList
        horizontal
        ref={flatListRef}
        data={onboardingPages}
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={(item) => item.page}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: OnboardingPage }) => {
          return item.component;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: w(24),
    marginHorizontal: w(16),
  },
  progressBarContainer: {
    height: h(3),
    backgroundColor: colors.gray300,
    borderRadius: w(99),
    width: w(273),
  },
  progressBarFill: {
    height: h(3),
    backgroundColor: colors.black,
    borderRadius: w(99),
  },
});

export default OnboardingMain;
