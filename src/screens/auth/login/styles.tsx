import { StyleSheet } from 'react-native';
import { font, fontSize } from '../../../themes/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#000',
  },
  subtitle: {
    fontSize: fontSize.veryLarge,
    fontFamily: font.nunitoRegular,
    color: '#aaa',
  },
  form: {
    marginBottom: 30,
    marginTop: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: fontSize.small,
    fontFamily: font.nunitoRegular,
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
    color: '#000',
    fontSize: fontSize.average,
    fontFamily: font.nunitoRegular,
  },
  signInLink: {
    color: '#FF6584', // Match gradient start color
    fontSize: fontSize.average,
    fontFamily: font.nunitoBold,
  },
});
