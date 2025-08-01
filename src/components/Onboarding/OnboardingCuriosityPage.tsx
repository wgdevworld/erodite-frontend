import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { h, w } from '../../styles/globalStyles';
import colors, { gradient } from '../../styles/colors';
import { CURIOUS_TOPICS_ENUM } from '../../types/store';
import { useOnboarding } from '../../context/OnboardingContext';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from '@react-native-vector-icons/ionicons';
import { useEffect } from 'react';
import assets from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';

const OnboardingCuriosityPage = () => {
  const { topicOrder, setTopicOrder, onPressNext } = useOnboarding();

  const curiosityTopicTitles: Record<
    CURIOUS_TOPICS_ENUM,
    { title: string; image: ImageSourcePropType }
  > = {
    [CURIOUS_TOPICS_ENUM.FEMALE_BODY]: { title: '여성의 몸', image: assets.images.female_symbol },
    [CURIOUS_TOPICS_ENUM.MALE_BODY]: { title: '남성의 몸', image: assets.images.male_symbol },
    [CURIOUS_TOPICS_ENUM.PROTECTION]: { title: '피임', image: assets.images.shield },
    [CURIOUS_TOPICS_ENUM.STI_PREVENTION]: { title: '성병의 이해', image: assets.images.virus },
    [CURIOUS_TOPICS_ENUM.ENJOYING_SEX]: { title: '성적 쾌락의 이해', image: assets.images.heart },
    [CURIOUS_TOPICS_ENUM.NEUROSCIENCE]: { title: '성(性)의 뇌과학', image: assets.images.brain },
    [CURIOUS_TOPICS_ENUM.SEXUAL_ORIENTATION]: { title: '성적 지향', image: assets.images.rainbow },
  };

  useEffect(() => {
    setTopicOrder(Object.keys(curiosityTopicTitles) as CURIOUS_TOPICS_ENUM[]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`가장 궁금한 주제부터\n순서를 정해 주세요`}</Text>
      <DraggableFlatList
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={curiosityTopicTitles[choice].image} style={styles.icon} />
                <Text style={styles.choiceText}>{curiosityTopicTitles[choice].title}</Text>
              </View>
              <Icon name={'reorder-three-outline'} size={w(16)} color={colors.black} />
            </TouchableOpacity>
          );
        }}
      />
      <LinearGradient
        colors={gradient.whiteButton}
        start={{ x: 0.5, y: 0.05 }}
        end={{ x: 0.5, y: 0.12 }}
        style={styles.linearGradient}
      >
        <TouchableOpacity style={styles.nextButton} onPress={onPressNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </LinearGradient>
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
    ...globalStyles.body1Semibold,
    color: colors.black,
  },
  choiceButton: {
    backgroundColor: colors.gray100,
    paddingHorizontal: w(12),
    paddingVertical: h(12),
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
  linearGradient: { width: '100%', position: 'absolute', bottom: h(0), paddingTop: h(24) },
  nextButton: {
    marginBottom: h(80),
    borderRadius: w(24),
    paddingHorizontal: w(16),
    paddingVertical: h(16),
    backgroundColor: colors.red2,
  },
  nextButtonText: {
    ...globalStyles.body1Bold,
    textAlign: 'center',
  },
  icon: { width: w(36), height: w(36), borderRadius: w(8), marginRight: w(8) },
});

export default OnboardingCuriosityPage;
