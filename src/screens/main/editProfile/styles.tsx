import { StyleSheet } from 'react-native';
import { colors, font } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: font.nunitoBold,
    color: colors.black,
    marginLeft: 12,
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontFamily: font.nunitoBold,
    color: colors.gray,
    marginBottom: 8,
    marginLeft: 4,
  },
});
