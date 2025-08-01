import { ImageSourcePropType } from 'react-native';

export type AssetImages = {
  images: {
    google_icon: ImageSourcePropType;
    kakao_icon: ImageSourcePropType;
    erodite_logo: ImageSourcePropType;
    spin_the_wheel: ImageSourcePropType;
    birthday_cake: ImageSourcePropType;
    notification_bell: ImageSourcePropType;
    body_anatomy: ImageSourcePropType;
    books: ImageSourcePropType;
    fist: ImageSourcePropType;
    question_mark: ImageSourcePropType;
    safety_helmet: ImageSourcePropType;
    two_characters_hugging: ImageSourcePropType;
    future: ImageSourcePropType;
  };
};

const assets: AssetImages = {
  images: {
    google_icon: require('./logo/google_icon.png'),
    kakao_icon: require('./logo/kakao_icon.png'),
    erodite_logo: require('./logo/erodite.png'),
    spin_the_wheel: require('./images/spin-the-wheel.png'),
    birthday_cake: require('./images/birthday-cake.png'),
    notification_bell: require('./images/notification-bell.png'),
    body_anatomy: require('./images/body-anatomy.png'),
    books: require('./images/books.png'),
    fist: require('./images/fist.png'),
    question_mark: require('./images/question-mark.png'),
    safety_helmet: require('./images/safety-helmet.png'),
    two_characters_hugging: require('./images/two-characters-hugging.png'),
    future: require('./images/future.png'),
  },
};

export default assets;
