import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles, { h, w } from '../../styles/globalStyles';
import colors, { gradient } from '../../styles/colors';
import Icon from '@react-native-vector-icons/ionicons';
import { INSTALL_INTENT_ENUM } from '../../types/store';
import { useOnboarding } from '../../context/OnboardingContext';
import assets from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';

type IntentChoices = {
  type: INSTALL_INTENT_ENUM;
  title: string;
  image: ImageSourcePropType;
};

const OnboardingIntentPage = () => {
  const { selectedIntent, setSelectedIntent, onPressNext } = useOnboarding();
  const intentChoices: IntentChoices[] = [
    {
      title: '그냥 궁금해서 왔어요',
      type: INSTALL_INTENT_ENUM.JUST_CURIOUS,
      image: assets.images.question_mark,
    },
    {
      title: '제 몸에 대해 더\n잘 알고 싶어요',
      type: INSTALL_INTENT_ENUM.BODY_CURIOUS,
      image: assets.images.body_anatomy,
    },
    {
      title: '학교에서 배우지 못한\n걸 배우고 싶어요',
      type: INSTALL_INTENT_ENUM.FURTHER_EDUCATION,
      image: assets.images.books,
    },
    {
      title: '성과 관계에 대해 더 자심감을 갖고 싶어요',
      type: INSTALL_INTENT_ENUM.SEX_POSITIVE,
      image: assets.images.fist,
    },
    {
      title: '더 좋은 파트너가 되고 싶어요',
      type: INSTALL_INTENT_ENUM.BETTER_PARTNER,
      image: assets.images.two_characters_hugging,
    },
    {
      title: '앞으로의 관계를 준비하고 있어요',
      type: INSTALL_INTENT_ENUM.PREPARE_FUTURE,
      image: assets.images.future,
    },
    {
      title: '안전하고 책임감 있는 사람이 되고 싶어요',
      type: INSTALL_INTENT_ENUM.SAFE_PERSON,
      image: assets.images.safety_helmet,
    },
  ];

  const canProceed = selectedIntent.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Erodite을 왜 다운 받으셨나요?</Text>
      <FlatList
        ListFooterComponent={<View style={{ height: h(180) }} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={intentChoices}
        renderItem={({ item, index }) => {
          const isSelected = selectedIntent.includes(item.type);
          return (
            <TouchableOpacity
              style={{
                ...styles.choiceButton,
                backgroundColor: isSelected ? colors.red7 : colors.gray100,
                marginRight: index % 2 == 0 ? w(6) : undefined,
              }}
              key={item.type}
              onPress={() => {
                if (isSelected) {
                  setSelectedIntent((prev) => prev.filter((selected) => selected !== item.type));
                } else {
                  setSelectedIntent((prev) => {
                    const newIntents = [...prev, item.type];
                    return newIntents;
                  });
                }
              }}
            >
              {/* <View> */}
              <Image source={item.image} style={styles.choiceImage} />
              <Text
                style={{ ...styles.choiceText, color: isSelected ? colors.white : colors.black }}
              >
                {item.title}
              </Text>
              {/* </View> */}
              <Icon
                name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                size={w(16)}
                color={isSelected ? colors.white : colors.gray800}
              />
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
        <TouchableOpacity
          style={{ ...styles.nextButton, opacity: canProceed ? 1 : 0.3 }}
          disabled={!canProceed}
          onPress={onPressNext}
        >
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
  },
  choiceText: {
    ...globalStyles.body1Semibold,
    color: colors.black,
    textAlign: 'center',
    marginTop: h(12),
    marginBottom: h(6),
  },
  choiceButton: {
    backgroundColor: colors.gray100,
    paddingHorizontal: w(16),
    paddingVertical: h(16),
    borderRadius: w(16),
    width: w(168),
    marginBottom: h(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linearGradient: { width: '100%', position: 'absolute', bottom: h(0), paddingTop: h(24) },
  nextButton: {
    marginBottom: h(80),
    borderRadius: w(24),
    paddingHorizontal: w(16),
    paddingVertical: h(16),
    backgroundColor: colors.red2,
  },
  choiceImage: {
    width: w(140),
    height: w(140),
    borderRadius: w(16),
  },
  nextButtonText: {
    ...globalStyles.body1Bold,
    textAlign: 'center',
  },
});

export default OnboardingIntentPage;
