import { StyleSheet } from 'react-native';
import { font, fontSize } from '../../../themes/fonts';
import { colors } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },

  header: {
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: fontSize.size28,
    fontFamily: font.nunitoBold,
    color: colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: fontSize.average,
    fontFamily: font.nunitoRegular,
    color: colors.lightgray,
    lineHeight: 24,
  },
  form: {
    marginBottom: 30,
    marginTop: 10,
  },
  inputSpacing: {
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    color: colors.labelGray,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: font.nunitoRegular,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.white,
    minWidth: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonSelected: {
    backgroundColor: colors.primaryPink,
    borderColor: colors.primaryPink,
  },
  genderText: {
    fontSize: fontSize.average,
    color: colors.black,
    fontFamily: font.nunitoRegular,
  },
  genderTextSelected: {
    color: colors.white,
    fontFamily: font.nunitoBold,
  },
  loginButton: {
    marginBottom: 16,
    marginTop: 'auto',
  },

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: colors.labelGray,
    fontSize: fontSize.average,
    fontFamily: font.nunitoRegular,
  },
});
