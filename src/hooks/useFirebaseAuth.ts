import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logError, logInfo } from '../tools/Log';
import { RootStackParamList } from '../navigation/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../api/user/mutations';

const useFirebaseAuth = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [createUserWithEmailAndPassword] = useMutation(CREATE_USER_MUTATION);

  const initialize = async () => {
    const firebaseUser = auth().currentUser;

    if (!firebaseUser) {
      navigation.navigate('LoginMain');
      return;
    }

    const idToken = await firebaseUser.getIdToken();

    try {
      //TODO: Send token to backend

      const backendUser = null;

      if (backendUser) {
        // if done onboarding, go to home
        // if not, go to onboarding
      } else {
        // Either social login with no record → go to onboarding
        // OR email login mismatch → show login error
      }
    } catch (err) {
      logError('Error verifying firebase user', err);
      navigation.navigate('LoginMain');
    }
  };

  const createUserWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const firebaseUid = userCredential.user.uid;

      const { data } = await createUserWithEmailAndPassword({
        variables: {
          email,
          firebaseUid,
        },
      });
      const backendUser = data?.createUser;
      logInfo(backendUser);
    } catch (err) {
      logError('Error during email signup', err);
    }
  };

  return { initialize, createUserWithEmail };
};

export default useFirebaseAuth;
