import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { h, w } from '../../styles/globalStyles';
import colors from '../../styles/colors';
import { GENDER_ENUM } from '../../types/store';
import Icon from '@react-native-vector-icons/ionicons';
import { useOnboarding } from '../../context/OnboardingContext';
import assets from '../../../assets';

type GenderChoices = {
  gender: GENDER_ENUM;
  icon: string;
  title: string;
};

const OnboardingGenderPage = () => {
  const { onPressNext, gender, setGender } = useOnboarding();

  const genderChoices: GenderChoices[] = [
    { gender: GENDER_ENUM.MALE, icon: 'male-outline', title: '남성' },
    {
      gender: GENDER_ENUM.FEMALE,
      icon: 'female-outline',
      title: '여성',
    },
    {
      gender: GENDER_ENUM.OTHER,
      icon: 'male-female-outline',
      title: '기타',
    },
  ];

  return (
    <View style={styles.container}>
      <View>
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
              <Icon
                // @ts-expect-error Using only appropriate icon names
                name={genderChoice.icon}
                size={w(14)}
                color={isSelected ? colors.white : colors.black}
              />
              <Text
                style={{ ...styles.choiceText, color: isSelected ? colors.white : colors.black }}
              >
                {genderChoice.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Image source={assets.images.spin_the_wheel} style={styles.image} />
      <TouchableOpacity
        style={{ ...styles.nextButton, opacity: gender ? 1 : 0.3 }}
        disabled={!gender}
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
    justifyContent: 'space-between',
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
    marginLeft: w(8),
  },
  choiceButton: {
    backgroundColor: colors.gray100,
    paddingHorizontal: w(16),
    paddingVertical: h(16),
    borderRadius: w(8),
    width: w(343),
    marginBottom: h(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButton: {
    width: w(343),
    marginBottom: h(58),
    borderRadius: w(24),
    paddingHorizontal: w(16),
    paddingVertical: h(16),
    backgroundColor: colors.red2,
  },
  nextButtonText: {
    ...globalStyles.body1Bold,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: w(163),
    height: w(163),
  },
});

export default OnboardingGenderPage;
