import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';
import {font, fontSize} from '../../themes/fonts';

export const styles = StyleSheet.create({
  button: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 15,
    borderRadius: 8,
    borderWidth: 1.78,
    borderColor: colors.darkgreen,
    marginBottom: 10,
  },

  buttonText: {
    color: colors.darkgreen,
    textAlign: 'center',

    fontSize: fontSize.medium,
    fontFamily: font.nunitoRegular,
  },
  enabledButton: {
    backgroundColor: colors.white,
  },
  disabledButton: {
    backgroundColor: colors.lightGrey,
  },
  loadingIdicator: {
    marginRight: 20,
  },
});
