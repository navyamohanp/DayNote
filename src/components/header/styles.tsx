import {StyleSheet} from 'react-native';
import {colors, font, fontSize} from '../../themes';

export const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 13,
    marginRight: 16,
  },
  backIcon: {
    height: 32,
    justifyContent: 'center',
    marginRight: 7,
    paddingRight: 10,
  },
  headerText: {
    fontSize: fontSize.veryLarge,
    fontFamily: font.nunitoBold,
    color: colors.darkgreen,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightButtonText: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoBold,
    //lineHeight: 21,
    color: colors.primary,

    marginLeft: 6,
  },
  rightIconContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
