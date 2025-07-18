import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logError, logInfo } from '../tools/Log';
import { RootStackParamList } from '../navigation/navigation';
import { useApolloClient } from '@apollo/client';
import { GET_OR_CREATE_USER_MUTATION } from '../api/user/mutations';
import { GET_USER_QUERY } from '../api/user/queries';
import { useUserStore } from '../store/userStore';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { User } from '../types/store';
import { useEffect } from 'react';
import { GOOGLE_SIGNIN_IOS_CLIENT_ID, GOOGLE_SIGNIN_WEB_CLIENT_ID } from '@env';

const useFirebaseAuth = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const client = useApolloClient();
  const { setUser } = useUserStore();

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_SIGNIN_IOS_CLIENT_ID,
      webClientId: GOOGLE_SIGNIN_WEB_CLIENT_ID,
    });
  }, []);

  const initialize = async () => {
    const firebaseUser = auth().currentUser;

    if (!firebaseUser) {
      navigation.navigate('LoginMain');
      return;
    }

    try {
      const { data: user } = await client.query({ query: GET_USER_QUERY });

      if (user) {
        setUser(user.getUser);
        navigation.navigate('HomeMain');
        // TODO: here, we want to fill in zustand
        // if done onboarding, go to home
        // if not, go to onboarding
      } else {
        // Either social login with no record → go to onboarding
        // OR email login mismatch → show login error
      }
    } catch (err) {
      logError('Error verifying firebase user', err);
    }
  };

  const createUserWithEmail = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await getOrCreateUser();
    } catch (err: any) {
      logError('Error during createUserWithEmail', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          Alert.alert('이미 사용 중인 이메일입니다.');
          break;
        case 'auth/invalid-email':
          Alert.alert('유효하지 않은 이메일 형식입니다.');
          break;
        case 'auth/weak-password':
          Alert.alert('비밀번호가 너무 약합니다. 더 강한 비밀번호를 입력해주세요.');
          break;
        case 'auth/network-request-failed':
          Alert.alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
          break;
        default:
          Alert.alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };

  const getOrCreateUser = async () => {
    try {
      const firebaseUser = auth().currentUser;
      if (!firebaseUser?.email || !firebaseUser.uid) throw new Error('Missing Firebase User');

      const { data: userData } = await client.mutate({
        mutation: GET_OR_CREATE_USER_MUTATION,
        variables: {
          email: firebaseUser.email,
          firebaseUid: firebaseUser.uid,
        },
      });
      const user = userData.getOrCreateUser;
      if (user) {
        setUser(user);
        onLoginFinished(user);
      }
    } catch (err) {
      logError('Login error', err);
    }
  };

  const onLoginFinished = async (user: User) => {
    logInfo('Logged in as ', user);
    navigation.navigate('HomeMain');
    //TODO: here, we must check if the user has completed onboarding
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      await getOrCreateUser();
    } catch (err) {
      Alert.alert('이메일 또는 비밀번호가 잘못 되었습니다.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { data } = await GoogleSignin.signIn();
      if (!data) {
        throw new Error('No Google User');
      }
      const idToken = data?.idToken;

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      await getOrCreateUser();
    } catch (err) {
      logError('Google sign-in error', err);
    }
  };

  return { initialize, createUserWithEmail, loginWithEmail, loginWithGoogle };
};

export default useFirebaseAuth;
