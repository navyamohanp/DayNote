import {StyleSheet} from 'react-native';
import {colors, font, fontSize} from '../../themes';
import {heightRatio, widthRatio} from '../../utilities/dimensions';

export const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: 25,
    zIndex: 20,
    elevation: 20,
    right: 20 * widthRatio,
    left: 20 * widthRatio,
    flexDirection: 'row',
    borderRadius: 10,
    paddingRight: 16 * widthRatio,
    paddingBottom: 15 * heightRatio,
    alignItems: 'center',
  },
  containerLeftStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    color: colors.white,
    fontFamily: font.medium,
    fontSize: fontSize.average,
    marginRight: 50 * widthRatio,
  },
});
