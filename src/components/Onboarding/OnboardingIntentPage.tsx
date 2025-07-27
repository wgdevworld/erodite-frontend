import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { h, w } from '../../styles/globalStyles';
import colors from '../../styles/colors';
import Icon from '@react-native-vector-icons/ionicons';
import { INSTALL_INTENT_ENUM } from '../../types/store';
import { useOnboarding } from '../../context/OnboardingContext';

type IntentChoices = {
  type: INSTALL_INTENT_ENUM;
  title: string;
};

const OnboardingIntentPage = () => {
  const { selectedIntent, setSelectedIntent, onPressNext } = useOnboarding();
  const intentChoices: IntentChoices[] = [
    {
      title: '그냥 궁금해서 왔어요',
      type: INSTALL_INTENT_ENUM.JUST_CURIOUS,
    },
    {
      title: '제 몸에 대해 더 잘 알고 싶어요',
      type: INSTALL_INTENT_ENUM.BODY_CURIOUS,
    },
    {
      title: '학교에서 배우지 못한 걸 배우고 싶어요',
      type: INSTALL_INTENT_ENUM.FURTHER_EDUCATION,
    },
    {
      title: '성과 관계에 대해 더 자심감을 갖고 싶어요',
      type: INSTALL_INTENT_ENUM.SEX_POSITIVE,
    },
    {
      title: '더 좋은 파트너가 되고 싶어요',
      type: INSTALL_INTENT_ENUM.BETTER_PARTNER,
    },
    {
      title: '앞으로의 관계를 준비하고 있어요',
      type: INSTALL_INTENT_ENUM.PREPARE_FUTURE,
    },
    {
      title: '안전하고 책임감 있는 사람이 되고 싶어요',
      type: INSTALL_INTENT_ENUM.SAFE_PERSON,
    },
  ];

  const canProceed = selectedIntent.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Erodite을 왜 다운 받으셨나요?</Text>
      {intentChoices.map((choice) => {
        const isSelected = selectedIntent.includes(choice.type);
        return (
          <TouchableOpacity
            style={{
              ...styles.choiceButton,
              backgroundColor: isSelected ? colors.red2 : colors.gray100,
            }}
            key={choice.type}
            onPress={() => {
              if (isSelected) {
                setSelectedIntent((prev) => prev.filter((selected) => selected !== choice.type));
              } else {
                setSelectedIntent((prev) => {
                  const newIntents = [...prev, choice.type];
                  return newIntents;
                });
              }
            }}
          >
            <Text style={{ ...styles.choiceText, color: isSelected ? colors.white : colors.black }}>
              {choice.title}
            </Text>
            <Icon
              name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
              size={w(16)}
              color={isSelected ? colors.white : colors.gray800}
            />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={{ ...styles.nextButton, opacity: canProceed ? 1 : 0.3 }}
        disabled={!canProceed}
        onPress={onPressNext}
      >
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
  },
  choiceText: {
    ...globalStyles.body1Semibold,
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

export default OnboardingIntentPage;
