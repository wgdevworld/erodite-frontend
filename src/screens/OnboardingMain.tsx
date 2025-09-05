import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { h, w } from '../styles/globalStyles';
import Icon from '@react-native-vector-icons/ionicons';
import colors from '../styles/colors';
import { OnboardingPage, useOnboarding } from '../context/OnboardingContext';

const OnboardingMain = () => {
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef<FlatList>(null);

  const { onboardingPages, curPage, onPressBack } = useOnboarding();

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
