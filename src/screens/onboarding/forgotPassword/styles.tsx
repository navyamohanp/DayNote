import { StyleSheet } from 'react-native';
import { font, fontSize } from '../../../themes/fonts';
import { colors } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: fontSize.size24,
    fontFamily: font.nunitoBold,
    color: colors.black,
  },
  subtitle: {
    fontSize: fontSize.size15,
    fontFamily: font.nunitoRegular,
    color: colors.lightgray,
    marginTop: 8,
  },
  form: {
    marginBottom: 30,
  },
  headerConten: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'red',
  },
  submitButton: {
    //  marginTop: 20,
  },
});
