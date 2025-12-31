import {Dimensions, PixelRatio, Platform} from 'react-native';

export const font = {
  nunitoSansBlack: 'Nunito-Sans-Black',
  nunitoSansBold: 'Nunito-Sans-Bold',
  nunitoSansExtraBold: 'Nunito-Sans-ExtraBold',
  nunitoSansExtraLight: 'Nunito-Sans-ExtraLight',
  nunitoSansLight: 'Nunito-Sans-Light',
  nunitoSansRegular: 'Nunito-Sans-Regular',
  nunitoSansSemiBold: 'Nunito-Sans-SemiBold',
  nunitoBlack: 'Nunito-Black',
  nunitoBold: 'Nunito-Bold',
  nunitoExtraBold: 'Nunito-ExtraBold',
  nunitoExtraLight: 'Nunito-ExtraLight',
  nunitoLight: 'Nunito-Light',
  nunitoMedium: 'Nunito-Medium',
  nunitoRegular: 'Nunito-Regular',
  nunitoSemiBold: 'Nunito-SemiBold',
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;
export function actuatedNormalize(size: any): any {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3;
  }
}
export const fontSize = {
  little: actuatedNormalize(8),
  verySmall: actuatedNormalize(9),
  smallest: actuatedNormalize(10),
  mediumSmall: actuatedNormalize(11),
  small: actuatedNormalize(12),
  normal: actuatedNormalize(13),
  average: actuatedNormalize(14),
  size15: actuatedNormalize(15),
  medium: actuatedNormalize(16),
  size17: actuatedNormalize(17),
  large: actuatedNormalize(18),
  size19: actuatedNormalize(19),
  veryLarge: actuatedNormalize(20),
  size21: actuatedNormalize(21),
  ultraLarge: actuatedNormalize(22),
  size24: actuatedNormalize(24),
  largest: actuatedNormalize(25),
  size26: actuatedNormalize(26),
  size27: actuatedNormalize(27),
  size28: actuatedNormalize(28),
  xLarge: actuatedNormalize(30),
  size32: actuatedNormalize(27),
  size33: actuatedNormalize(28),
  size40: actuatedNormalize(35),

  title: actuatedNormalize(16),
  subtitle: actuatedNormalize(12),
  description: actuatedNormalize(13),
  error: actuatedNormalize(10),
  chatsHeadLarge: actuatedNormalize(24),
};
