import { StyleSheet } from 'react-native';
import { colors } from '../../../../../themes';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  mood: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  editedTime: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'right',
  },
  menuButton: {
    padding: 4,
    marginLeft: 4,
  },
  menuIcon: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
});
