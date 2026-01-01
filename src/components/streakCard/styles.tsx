import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';
import { font } from '../../themes';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
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
  decorativeCircle1: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE5EC',
    opacity: 0.3,
    right: -10,
    top: -10,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5EC',
    opacity: 0.2,
    right: 40,
    bottom: 10,
  },
});
