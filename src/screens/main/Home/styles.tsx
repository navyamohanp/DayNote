import { StyleSheet } from 'react-native';
import colors from '../../../themes/colors';
import { font } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
    fontFamily: font.nunitoBold,
  },
  subGreeting: {
    fontSize: 15,
    color: colors.textSecondary,
    fontFamily: font.nunitoBold,
  },
  profilePicture: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE5EC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primaryPink,
  },
  recentSection: {
    marginTop: 8,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: font.nunitoBold,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.viewAllLink,
    fontFamily: font.nunitoRegular,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontFamily: font.nunitoRegular,
    fontSize: 14,
  },
});
