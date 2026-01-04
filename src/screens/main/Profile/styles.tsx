import { StyleSheet } from 'react-native';
import { colors, font, fontSize } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },
  headerTitle: {
    fontSize: fontSize.ultraLarge,
    fontFamily: font.nunitoBold,
    color: colors.black,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryPink,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.primaryPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarInitial: {
    fontSize: 40,
    fontFamily: font.nunitoBold,
    color: colors.white,
  },
  userName: {
    fontSize: fontSize.large,
    fontFamily: font.nunitoBold,
    color: colors.black,
  },
  userHandle: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoMedium,
    color: colors.gray,
    marginTop: 4,
  },
  infoSection: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderBottomColor: colors.lightgray,
    borderColor: colors.lightgray,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },
  lastInfoItem: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: fontSize.small,
    fontFamily: font.nunitoMedium,
    color: colors.gray,
    width: 80,
  },
  infoValue: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoSemiBold,
    color: colors.black,
    flex: 1,
  },
  footer: {
    padding: 24,
    marginTop: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE3E3',
  },
  logoutText: {
    fontSize: fontSize.medium,
    fontFamily: font.nunitoBold,
    color: '#FF4D4D',
    marginLeft: 8,
  },
});
