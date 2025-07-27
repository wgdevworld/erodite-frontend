import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { h, w } from '../../styles/globalStyles';
import colors from '../../styles/colors';
import { CURIOUS_TOPICS_ENUM } from '../../types/store';
import { useOnboarding } from '../../context/OnboardingContext';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from '@react-native-vector-icons/ionicons';
import { useEffect } from 'react';

const OnboardingCuriosityPage = () => {
  const { topicOrder, setTopicOrder } = useOnboarding();

  const curiosityTopicTitles: Record<CURIOUS_TOPICS_ENUM, string> = {
    [CURIOUS_TOPICS_ENUM.FEMALE_BODY]: '👧🏻 여성의 몸',
    [CURIOUS_TOPICS_ENUM.MALE_BODY]: '👦🏻 남성의 몸',
    [CURIOUS_TOPICS_ENUM.PROTECTION]: '🛡️ 피임',
    [CURIOUS_TOPICS_ENUM.STI_PREVENTION]: '💉 성병의 이해',
    [CURIOUS_TOPICS_ENUM.ENJOYING_SEX]: '♨️ 성적 쾌락의 이해',
    [CURIOUS_TOPICS_ENUM.NEUROSCIENCE]: '🧠 성(性)의 뇌과학',
    [CURIOUS_TOPICS_ENUM.SEXUAL_ORIENTATION]: '🏳️‍🌈 성적 지향',
  };

  useEffect(() => {
    setTopicOrder(Object.keys(curiosityTopicTitles) as CURIOUS_TOPICS_ENUM[]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`가장 궁금한 주제부터\n순서를 정해 주세요`}</Text>
      <DraggableFlatList
        bounces={false}
        data={topicOrder}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => {
          setTopicOrder(data);
        }}
        renderItem={({ item: choice, drag }) => {
          return (
            <TouchableOpacity
              style={styles.choiceButton}
              key={choice}
              onLongPress={drag}
              delayLongPress={150}
            >
              <Text style={styles.choiceText}>{curiosityTopicTitles[choice]}</Text>
              <Icon name={'reorder-three-outline'} size={w(16)} color={colors.black} />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: w(343),
    alignItems: 'center',
    marginTop: h(36),
    marginHorizontal: w(16),
  },
  title: {
    ...globalStyles.headline2Bold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: h(24),
    lineHeight: 1.2 * globalStyles.headline2Bold.fontSize,
  },
  choiceText: {
    ...globalStyles.body1Regular,
    color: colors.black,
  },
  choiceButton: {
    backgroundColor: colors.gray100,
    paddingHorizontal: w(16),
    paddingVertical: h(16),
    borderRadius: w(8),
    width: w(343),
    marginBottom: h(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: w(16),
  },
  nextButton: {
    width: w(343),
    position: 'absolute',
    bottom: h(58),
    borderRadius: w(24),
    paddingHorizontal: w(16),
    paddingVertical: h(16),
    backgroundColor: colors.red2,
  },
  nextButtonText: {
    ...globalStyles.body1Bold,
    textAlign: 'center',
  },
});

export default OnboardingCuriosityPage;
