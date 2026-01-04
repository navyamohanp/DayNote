import { StyleSheet } from 'react-native';
import { colors, font, fontSize } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: font.nunitoBold,
    color: colors.black,
    marginBottom: 20,
  },
  form: {
    //  gap: 20,
    marginTop: 30,
  },
  contentContainer: {
    borderColor: colors.primaryPink,
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
    paddingTop: 12,
    fontSize: 16,
    fontFamily: font.nunitoRegular,
    color: colors.textPrimary,
  },
  buttonContainer: {
    marginTop: 20,
  },
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  moodTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: font.nunitoBold,
  },
  contentTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: font.nunitoBold,
    marginTop: 15,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: fontSize.small,
    fontFamily: font.nunitoRegular,
    marginTop: 4,
  },
});
