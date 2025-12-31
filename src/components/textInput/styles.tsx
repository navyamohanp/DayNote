import { StyleSheet } from 'react-native';
import { font, fontSize } from '../../themes/fonts';
import { colors } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  label: {
    // Removed as we use Animated.Text inline
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: fontSize.average,
    fontFamily: font.nunitoSemiBold,
    color: colors.black,
    height: '100%',
  },
  inputNormalBorder: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputFocusedBorder: {
    borderWidth: 1,
    borderColor: '#E0E0E0', // Or active color
  },
  inputErrorBorder: {
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: fontSize.small,
    fontFamily: font.nunitoRegular,
    marginTop: 4,
  },
  eyeIcon: {
    marginLeft: 10,
  },
});
