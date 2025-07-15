import { Text, TouchableOpacity, View } from 'react-native';
import { useUserStore } from '../store/userStore';
import { mmkv } from '../store/storage';
import auth from '@react-native-firebase/auth';
import { apolloClient } from '../api/client';
import { h, w } from '../styles/globalStyles';
import colors from '../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../navigation/navigation';

type Props = NativeStackScreenProps<ScreenParamList, 'HomeMain'>;

const HomeMain = ({ navigation }: Props) => {
  const user = useUserStore((state) => state.user);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ textAlign: 'center' }}>
        Logged in with {user?.email} with id {user?.id}
      </Text>
      <TouchableOpacity
        style={{
          marginTop: h(34),
          backgroundColor: colors.red1,
          padding: w(12),
          borderRadius: w(12),
        }}
        onPress={async () => {
          await apolloClient.resetStore();
          mmkv.clearAll();
          await auth().signOut();
          navigation.navigate('LoginMain');
        }}
      >
        <Text>Logout </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeMain;
