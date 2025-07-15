import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logError, logInfo } from '../tools/Log';
import { RootStackParamList } from '../navigation/navigation';
import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../api/user/mutations';
import { GET_USER_QUERY } from '../api/user/queries';
import { useUserStore } from '../store/userStore';

const useFirebaseAuth = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const client = useApolloClient();
  const [createUserWithEmailAndPassword] = useMutation(CREATE_USER_MUTATION);
  const { setUser } = useUserStore();

  const initialize = async () => {
    const firebaseUser = auth().currentUser;

    if (!firebaseUser) {
      navigation.navigate('LoginMain');
      return;
    }

    try {
      const { data: backendUser } = await client.query({ query: GET_USER_QUERY });

      if (backendUser) {
        setUser(backendUser.getUser);
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
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const firebaseUid = userCredential.user.uid;

      const { data } = await createUserWithEmailAndPassword({
        variables: {
          email,
          firebaseUid,
        },
      });
      const backendUser = data?.createUser;
      //TODO: here we probably want to fill in redux
      logInfo(backendUser);
    } catch (err) {
      logError('Error during email signup', err);
    }
  };

  return { initialize, createUserWithEmail };
};

export default useFirebaseAuth;
