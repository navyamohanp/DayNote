import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';
import { font } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
    fontFamily: font.nunitoBold,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: font.nunitoRegular,
  },
  illustration: {
    width: 80,
    height: 80,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
