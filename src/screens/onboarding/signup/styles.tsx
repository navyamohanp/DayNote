import { StyleSheet } from 'react-native';
import { font, fontSize } from '../../../themes/fonts';
import { colors } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },

  header: {
    marginBottom: 40,
    marginTop: 60,
  },
  title: {
    fontSize: fontSize.size28,
    fontFamily: font.nunitoBold,
    color: colors.black,
  },
  subtitle: {
    fontSize: fontSize.veryLarge,
    fontFamily: font.nunitoRegular,
    color: colors.lightgray,
  },
  form: {
    marginBottom: 30,
    marginTop: 20,
  },
  footer: {
    marginTop: 'auto',
  },
  loginButton: {
    marginBottom: 16,
  },

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: colors.black,
    fontSize: fontSize.average,
    fontFamily: font.nunitoRegular,
  },
  signInLink: {
    color: colors.primaryPink,
    fontSize: fontSize.average,
    fontFamily: font.nunitoBold,
  },
});
