import { StyleSheet } from 'react-native';
import { colors, font, fontSize } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: font.nunitoBold,
    color: colors.black,
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  form: {
    padding: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoSemiBold,
    color: colors.black,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 20,
  },
});
