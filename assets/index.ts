import { ImageSourcePropType } from 'react-native';

export type AssetImages = {
  images: {
    google_icon: ImageSourcePropType;
    kakao_icon: ImageSourcePropType;
    erodite_logo: ImageSourcePropType;
  };
};

const assets: AssetImages = {
  images: {
    google_icon: require('./logo/google_icon.png'),
    kakao_icon: require('./logo/kakao_icon.png'),
    erodite_logo: require('./logo/erodite.png'),
  },
};

export default assets;
