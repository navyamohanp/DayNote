import { StyleSheet } from 'react-native';
import { colors, font, fontSize } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    transform: [{ rotate: '180deg' }],
  },
  headerTitle: {
    fontSize: fontSize.ultraLarge,
    fontFamily: font.nunitoBold,
    color: colors.black,
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
