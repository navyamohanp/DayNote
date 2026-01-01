import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';
import { font, fontSize } from '../../themes/fonts';

export const styles = StyleSheet.create({
  button: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: font.nunitoBold,
  },

  disabledButton: {
    backgroundColor: colors.lightgray,
  },
  loadingIdicator: {
    marginRight: 0,
  },
});
