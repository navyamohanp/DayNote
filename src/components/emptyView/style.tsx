import {StyleSheet} from 'react-native';
import {colors, font, fontSize} from '../../themes';
import {heightRatio} from '../../utilities/dimensions';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoRegular,
    color: colors.secondary,
    marginTop: 20 * heightRatio,
    textAlign: 'center',
    flex: 1,
  },
});
