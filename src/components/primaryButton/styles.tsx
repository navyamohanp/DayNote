import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';
import { font, fontSize } from '../../themes/fonts';

export const styles = StyleSheet.create({
  button: {
    height: 44,
    // backgroundColor: colors.mainGreenText,
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSize.medium,
    fontFamily: font.nunitoBold,
  },
  enabledButton: {
    // backgroundColor: colors.mainGreenText,
  },
  disabledButton: {
    backgroundColor: colors.gray,
  },
  loadingIdicator: {
    marginRight: 0,
  },
});
