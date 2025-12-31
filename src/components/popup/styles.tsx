import {StyleSheet} from 'react-native';
import {colors, font, fontSize} from '../../themes';
import {heightRatio} from '../../utilities/dimensions';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignSelf: 'center',
  },

  title: {
    fontSize: fontSize.large,
    fontFamily: font.nunitoSemiBold,
    lineHeight: 25,
    marginBottom: 7,
    marginTop: 16,
    textAlign: 'center',
    color: colors.secondary,
  },
  message: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoRegular,
    lineHeight: 20,
    marginBottom: 2,
    textAlign: 'center',
    color: colors.secondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
    marginTop: 20 * heightRatio,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    flexDirection: 'row',
  },

  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  blackButton: {
    backgroundColor: colors.lightblack2,
  },
  buttonText: {
    fontSize: fontSize.average,
    fontFamily: font.nunitoSemiBold,
    lineHeight: 19,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.secondary,
  },
  optionalMsgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    //marginBottom: 24,
  },

  message2: {
    fontSize: fontSize.average,
    fontFamily: font.nunitoRegular,
    textAlign: 'center',
    lineHeight: 18,
    color: colors.privacyText,
  },
  importantMessage: {
    color: colors.privacyText,
  },

  boldText: {
    fontFamily: font.nunitoBold,
    color: colors.privacyText,
  },
  loader: {
    marginLeft: 10,
  },
  buttonContent: {
    flexDirection: 'row', // Align text and loader side by side
    alignItems: 'center', // Center them vertically
  },
  message4: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoRegular,
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.secondary,
  },
});
