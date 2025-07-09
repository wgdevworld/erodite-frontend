import { Platform, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import colors from './colors';

export const basicDimensions = {
  height: 812,
  width: 375,
};

export const height = parseFloat(
  (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
);

export const width = parseFloat(
  (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
);

export const h = (value: number) => {
  if (isNaN(value)) {
    return 0;
  }
  return height * value;
};

export const w = (value: number) => {
  if (isNaN(value)) {
    return 0;
  }
  return width * value;
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const aspectRatio = screenHeight / screenWidth;
export const isLowAspectRatioDevice = aspectRatio < 1.5;

export const fonts = StyleSheet.create({
  light: {
    fontFamily: 'AppleSDGothicNeo-Light',
    color: colors.white,
    paddingBottom: Platform.OS === 'android' ? h(2) : 0,
  },
  regular: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: colors.white,
    paddingBottom: Platform.OS === 'android' ? h(2) : 0,
  },
  medium: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    color: colors.white,
  },
  semiBold: {
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    color: colors.white,
  },
  bold: {
    fontFamily: 'AppleSDGothicNeo-Bold',
    color: colors.white,
    paddingBottom: Platform.OS === 'android' ? h(2) : 0,
  },
  extraBold: {
    fontFamily: 'AppleSDGothicNeo-ExtraBold',
    color: colors.white,
    paddingBottom: Platform.OS === 'android' ? h(2) : 0,
  },
});

const usages = StyleSheet.create({
  headline1Bold: {
    ...fonts.bold,
    fontSize: width * 30,
  },
  headline1Medium: {
    ...fonts.medium,
    fontSize: width * 30,
  },
  headline2Bold: {
    ...fonts.bold,
    fontSize: width * 26,
  },
  headline2Medium: {
    ...fonts.medium,
    fontSize: width * 26,
  },
  subHeadline1Bold: {
    ...fonts.bold,
    fontSize: width * 24,
  },
  subHeadline1Medium: {
    ...fonts.medium,
    fontSize: width * 24,
  },
  subHeadline2Bold: {
    ...fonts.bold,
    fontSize: width * 22,
  },
  subHeadline2Medium: {
    ...fonts.medium,
    fontSize: width * 22,
  },
  subHeadline3Bold: {
    ...fonts.bold,
    fontSize: width * 20,
  },
  subHeadline3Medium: {
    ...fonts.medium,
    fontSize: width * 20,
  },
  subHeadline4Bold: {
    ...fonts.bold,
    fontSize: width * 18,
  },
  subHeadline4Regular: {
    ...fonts.regular,
    fontSize: width * 18,
  },
  subHeadline4Medium: {
    ...fonts.medium,
    fontSize: width * 18,
  },
  body1Bold: {
    ...fonts.bold,
    fontSize: width * 16,
  },
  body1Regular: {
    ...fonts.regular,
    fontSize: width * 16,
  },
  body2Bold: {
    ...fonts.bold,
    fontSize: width * 14,
  },
  body2Regular: {
    ...fonts.regular,
    fontSize: width * 14,
  },
  body3Regular: {
    ...fonts.regular,
    fontSize: width * 12,
  },
  body3SemiBold: {
    ...fonts.semiBold,
    fontSize: width * 12,
  },
  body3Bold: {
    ...fonts.bold,
    fontSize: width * 12,
  },
  body4Bold: {
    ...fonts.bold,
    fontSize: width * 11,
  },
  body4Regular: {
    ...fonts.regular,
    fontSize: width * 11,
  },
  body4Light: {
    ...fonts.light,
    fontSize: width * 11,
  },
  body5Bold: {
    ...fonts.bold,
    fontSize: width * 10,
  },
  body5Regular: {
    ...fonts.medium,
    fontSize: width * 10,
  },
  body5Light: {
    ...fonts.light,
    fontSize: width * 10,
  },
});

const globalStyles = StyleSheet.create({
  ...fonts,
  ...usages,
  flex_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_col: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_row_spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewShadow: {
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default globalStyles;
