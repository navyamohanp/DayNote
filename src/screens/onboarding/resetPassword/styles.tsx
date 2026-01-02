import { StyleSheet } from 'react-native';
import { colors, font, fontSize } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: fontSize.veryLarge,
    color: colors.black,
    fontFamily: font.nunitoBold,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  form: {
    marginBottom: 30,
  },
  submitButton: {
    marginTop: 10,
  },
});
