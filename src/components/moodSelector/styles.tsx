import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';
import { font, fontSize } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,

    borderColor: colors.primaryPink,
    borderWidth: 1,
  },

  illustration: {
    width: 80,
    height: 80,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moodButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  moodButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: font.nunitoRegular,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: fontSize.small,
    fontFamily: font.nunitoRegular,
    marginTop: 4,
  },
});
