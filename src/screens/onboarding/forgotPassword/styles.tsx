import { StyleSheet } from 'react-native';
import { font, fontSize } from '../../../themes/fonts';
import { colors } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: fontSize.size24,
    fontFamily: font.nunitoBold,
    color: colors.black,
    marginLeft: 10,
  },
  submitButton: {
    //  marginTop: 20,
  },
});
