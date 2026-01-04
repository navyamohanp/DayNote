import { StyleSheet } from 'react-native';
import { colors, font, fontSize } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: font.nunitoBold,
  },

  profileSection: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 55,
    backgroundColor: colors.primaryPink,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 55,
  },
  avatarInitial: {
    fontSize: 26,
    fontFamily: font.nunitoBold,
    color: colors.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.black,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  userName: {
    fontSize: 24,
    fontFamily: font.nunitoBold,
    color: colors.black,
  },
  userHandle: {
    fontSize: 16,
    fontFamily: font.nunitoMedium,
    color: colors.gray,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: font.nunitoBold,
    color: colors.primaryPink,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 12,
    borderWidth: 0.5,
    borderColor: colors.primaryPink,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastInfoItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emojiIcon: {
    fontSize: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: font.nunitoMedium,
    color: colors.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: font.nunitoSemiBold,
    color: colors.black,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: font.nunitoSemiBold,
    color: colors.black,
  },

  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
