import {StyleSheet} from 'react-native';
import {colors} from '../../themes';
import {font, fontSize} from '../../themes/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    overflow: 'hidden',
    height: '100%',
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textStyleTitle: {
    fontFamily: font.nunitoSemiBold,
    fontSize: fontSize.size15,
    color: colors.secondary,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  textStyleSubTitle: {
    fontFamily: font.nunitoRegular,
    fontSize: fontSize.average,

    color: colors.secondary,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  retryTextContainer: {
    borderRadius: 7,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
  },
  retryText: {
    fontFamily: font.nunitoMedium,
    fontSize: fontSize.average,
    color: colors.secondary,
    textAlign: 'center',
  },
  imgStyle: {
    width: 73,
    height: 61,
    margin: 20,
  },
});
