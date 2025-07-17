import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles, { h, w } from '../styles/globalStyles';
import { BlurView } from '@react-native-community/blur';
import assets from '../../assets';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useState } from 'react';

const LoginMain = () => {
  const { createUserWithEmail, loginWithEmail, loginWithGoogle } = useFirebaseAuth();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  return (
    <>
      <LinearGradient
        colors={[colors.coral1, colors.red1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearBackground}
      />
      <View style={styles.container}>
        <Image source={assets.images.erodite_logo} style={styles.logo} />
        <View style={styles.emailPasswordContainer}>
          <View style={styles.inputContainter}>
            <BlurView style={styles.blurView} blurType="light" />
            <TextInput
              style={{ ...globalStyles.body1Bold, ...styles.userInput }}
              textContentType="emailAddress"
              placeholder="이메일"
              placeholderTextColor={colors.gray700}
              value={emailInput}
              onChangeText={setEmailInput}
            />
          </View>
          <View style={styles.inputContainter}>
            <BlurView style={styles.blurView} blurType="light" />
            <TextInput
              style={{ ...globalStyles.body1Bold, ...styles.userInput }}
              textContentType="password"
              placeholder="비밀번호"
              secureTextEntry
              placeholderTextColor={colors.gray700}
              value={passwordInput}
              onChangeText={setPasswordInput}
            />
          </View>
          <View style={styles.emailBtnContainer}>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: colors.white,
                borderTopLeftRadius: w(16),
                borderBottomLeftRadius: w(16),
              }}
              onPress={() => {
                createUserWithEmail(emailInput, passwordInput);
              }}
            >
              <Text style={{ ...globalStyles.body1Bold, color: colors.gray900 }}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,

                borderTopRightRadius: w(16),
                borderBottomRightRadius: w(16),
              }}
              onPress={() => loginWithEmail(emailInput, passwordInput)}
            >
              <Text style={globalStyles.body1Bold}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text
            style={{ ...globalStyles.body1Bold, color: colors.gray900, paddingHorizontal: w(2) }}
          >
            또는
          </Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.socialLoginBtn} onPress={loginWithGoogle}>
          <Image source={assets.images.google_icon} style={styles.socialLoginImage} />
          <Text style={styles.socialLoginText}>구글로 계속하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.socialLoginBtn, marginBottom: 0 }}>
          <Image source={assets.images.kakao_icon} style={styles.socialLoginImage} />
          <Text style={styles.socialLoginText}>카카오로 계속하기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'center',
  },
  linearBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  logo: {
    width: w(180),
    height: w(60),
    alignSelf: 'center',
    marginBottom: h(64),
  },
  emailPasswordContainer: {
    alignSelf: 'center',
  },
  emailBtnContainer: {
    flexDirection: 'row',
    width: w(343),
  },
  inputContainter: {
    height: h(48),
    width: w(343),
    justifyContent: 'center',
    borderTopLeftRadius: w(16),
    borderTopRightRadius: w(16),
    marginBottom: h(8),
  },
  userInput: {
    backgroundColor: 'transparent',
    height: '100%',
    marginHorizontal: w(16),
    color: colors.gray900,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: w(16),
  },
  button: {
    width: '50%',
    height: h(48),
    backgroundColor: colors.gray900,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: h(8),
  },
  divider: {
    borderWidth: w(1.5),
    borderRadius: w(99),
    borderColor: colors.gray900,
    alignSelf: 'center',
    marginVertical: h(32),
    flexGrow: 1,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: w(343),
  },
  socialLoginBtn: {
    backgroundColor: colors.gray900,
    flexDirection: 'row',
    borderRadius: w(16),
    width: w(343),
    height: h(48),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: h(6),
  },
  socialLoginImage: {
    position: 'absolute',
    left: w(12),
    width: w(24),
    height: w(24),
  },
  socialLoginText: {
    ...globalStyles.body1Bold,
    color: colors.white,
  },
});

export default LoginMain;
