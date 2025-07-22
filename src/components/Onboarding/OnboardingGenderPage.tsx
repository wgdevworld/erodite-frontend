import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { h, w } from '../../styles/globalStyles';
import colors from '../../styles/colors';
import { GENDER_ENUM } from '../../types/store';
import { JSX } from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import { useOnboarding } from '../../context/OnboardingContext';

type GenderChoices = {
  gender: GENDER_ENUM;
  icon: JSX.Element;
  title: string;
};

const OnboardingGenderPage = () => {
  const { gender, setGender } = useOnboarding();

  const genderChoices: GenderChoices[] = [
    { gender: GENDER_ENUM.MALE, icon: <Icon name="male-outline" />, title: '남성' },
    { gender: GENDER_ENUM.FEMALE, icon: <Icon name="female-outline" />, title: '여성' },
    { gender: GENDER_ENUM.OTHER, icon: <Icon name="male-female-outline" />, title: '기타' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원님의 성별을 알려주세요</Text>
      {genderChoices.map((genderChoice) => {
        const isSelected = gender === genderChoice.gender;
        return (
          <TouchableOpacity
            style={{
              ...styles.choiceButton,
              backgroundColor: isSelected ? colors.red2 : colors.gray100,
            }}
            key={genderChoice.gender}
            onPress={() => {
              setGender(genderChoice.gender);
            }}
          >
            <Text style={{ ...styles.choiceText, color: isSelected ? colors.white : colors.black }}>
              {genderChoice.title}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={{ ...styles.nextButton, opacity: gender ? 1 : 0.3 }}
        disabled={!gender}
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
  },
  title: {
    ...globalStyles.headline2Bold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: h(16),
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

export default OnboardingGenderPage;
