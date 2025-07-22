import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import assets from '../../assets';
import globalStyles, { w } from '../styles/globalStyles';
import * as Animatable from 'react-native-animatable';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const InitialConfigMain = () => {
  const { initialize } = useFirebaseAuth();

  useEffect(() => {
    initialize();
  }, []);

  const fadeInFadeOutAnimation = {
    0: {
      opacity: 1,
    },
    0.5: {
      opacity: 0.3,
    },
    1: {
      opacity: 1,
    },
  };

  return (
    <>
      <LinearGradient
        colors={[colors.red7, colors.red1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearBackground}
      />
      <View style={styles.container}>
        <Image source={assets.images.erodite_logo} style={styles.logo} />
        <Animatable.Text
          style={styles.bottomText}
          animation={fadeInFadeOutAnimation}
          iterationCount={'infinite'}
          duration={3000}
        >
          로그인 중...
        </Animatable.Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  linearBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  container: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '30%',
  },
  logo: {
    width: w(180),
    height: w(60),
    marginTop: '30%',
  },
  bottomText: {
    ...globalStyles.body2Regular,
    color: colors.white,
  },
});

export default InitialConfigMain;
