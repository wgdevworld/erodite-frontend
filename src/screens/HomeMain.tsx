import { Text, View } from 'react-native';
import { useUserStore } from '../store/userStore';

const HomeMain = () => {
  const user = useUserStore((state) => state.user);
  return (
    <View>
      <Text>
        Logged in with {user?.email} with id {user?.id}
      </Text>
    </View>
  );
};

export default HomeMain;
