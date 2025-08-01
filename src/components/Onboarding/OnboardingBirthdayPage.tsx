import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import globalStyles, { h, w } from '../../styles/globalStyles';
import colors from '../../styles/colors';
import { useOnboarding } from '../../context/OnboardingContext';
import { useState } from 'react';
import assets from '../../../assets';

const OnboardingBirthdayPage = () => {
  const { onPressNext, setDateOfBirth } = useOnboarding();
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();

  const isDoneInputBirthday = !!(year && month && day);

  const isValidBirthday = () => {
    const y = parseInt(year, 10);
    const mo = parseInt(month, 10);
    const d = parseInt(day, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(y) || isNaN(mo) || isNaN(d)) return false;
    if (y < 1900 || y > currentYear) return false;
    if (mo < 1 || mo > 12) return false;
    if (d < 1 || d > getDaysInMonth(y, mo)) return false;
    if (new Date(y, mo - 1, d) > new Date()) return false;
    return true;
  };

  const handleNext = () => {
    const y = parseInt(year, 10);
    const mo = parseInt(month, 10) - 1;
    const d = parseInt(day, 10);
    setDateOfBirth(new Date(Date.UTC(y, mo, d)));
    onPressNext();
  };

  const shouldProceed = isDoneInputBirthday && isValidBirthday();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원님의 생일을 알려주세요</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={year}
          onChangeText={(text) => {
            const digitsOnly = text.replace(/[^0-9]/g, '');
            setYear(digitsOnly);
          }}
          style={styles.inputYear}
          placeholder="YYYY"
          keyboardType="numeric"
          maxLength={4}
        />
        <TextInput
          value={month}
          onChangeText={(text) => {
            const digitsOnly = text.replace(/[^0-9]/g, '');
            setMonth(digitsOnly);
          }}
          style={styles.inputMonth}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          value={day}
          onChangeText={(text) => {
            const digitsOnly = text.replace(/[^0-9]/g, '');
            setDay(digitsOnly);
          }}
          style={styles.inputDay}
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
      <Image source={assets.images.birthday_cake} style={styles.image} />
      <View style={styles.bottomContainer}>
        {isDoneInputBirthday && !isValidBirthday() && (
          <Text style={styles.wrongBirthdayText}>올바른 생년월일을 입력해주세요</Text>
        )}
        <TouchableOpacity
          style={{ ...styles.nextButton, opacity: shouldProceed ? 1 : 0.3 }}
          disabled={!shouldProceed}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: w(343),
    marginBottom: h(24),
  },
  inputYear: {
    ...globalStyles.headline1Bold,
    width: w(180),
    height: h(80),
    borderWidth: w(0.5),
    textAlign: 'center',
    borderColor: colors.gray300,
    borderRadius: w(16),
    paddingHorizontal: 12,
    color: colors.black,
  },
  inputMonth: {
    ...globalStyles.headline1Bold,
    width: w(70),
    height: h(80),
    borderWidth: w(0.5),
    textAlign: 'center',
    borderColor: colors.gray300,
    borderRadius: w(16),
    paddingHorizontal: 12,
    color: colors.black,
  },
  inputDay: {
    ...globalStyles.headline1Bold,
    width: w(70),
    height: h(80),
    borderWidth: w(0.5),
    borderColor: colors.gray300,
    textAlign: 'center',
    borderRadius: w(16),
    paddingHorizontal: 12,
    color: colors.black,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: h(58),
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: w(24),
  },
  wrongBirthdayText: {
    ...globalStyles.body1Regular,
    color: colors.red1,
    marginBottom: h(8),
  },
  nextButton: {
    width: w(343),
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
    position: 'absolute',
    marginTop: '60%',
    alignSelf: 'center',
    width: w(163),
    height: w(163),
  },
});

export default OnboardingBirthdayPage;
