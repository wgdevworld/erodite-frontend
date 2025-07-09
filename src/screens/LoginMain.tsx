import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import Svg, { Path } from 'react-native-svg';

const LoginMain = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }}>
      <Text>Hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginMain;
