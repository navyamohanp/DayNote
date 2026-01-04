import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logout } from '../../../redux/reducers/authenticationReducer';
import { logoutApi } from '../../../api/authAPI';
import SvgImage from '../../../utilities/svgIcons';
import { colors, font } from '../../../themes';
import { removeAllKeys } from '../../../utilities/asyncStore';
import { deleteUserApi } from '../../../api/commonAPI';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import Popup from '../../../components/popup';
import Toaster from '../../../components/toasts/helper';

const Profile = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [comingSoonVisible, setComingSoonVisible] = useState(false);

  const userData = useSelector(
    (state: RootState) => state.authentication.userData,
  );
  const handleLogout = () => {
    setLogoutVisible(true);
  };

  const onLogoutPress = async () => {
    setLoading(true);
    try {
      await logoutApi();
      await removeAllKeys();
      dispatch(logout());
    } catch (error) {
      console.log('Logout error:', error);
      await removeAllKeys();
      dispatch(logout());
    } finally {
      setLoading(false);
      setLogoutVisible(false);
    }
  };

  const handleDeleteAccount = () => {
    setDeleteVisible(true);
  };

  const onDeletePress = async () => {
    setLoading(true);
    try {
      const response: any = await deleteUserApi();
      if (response.code === 200) {
        Toaster.showToast(response.message, 'successToast');
        console.log(response);
        await removeAllKeys();
        dispatch(logout());
      }
    } catch (error) {
      console.log('Delete account error:', error);
    } finally {
      setLoading(false);
      setDeleteVisible(false);
    }
  };

  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarInitial}>
              {userData?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
            <TouchableOpacity style={styles.editAvatarButton}>
              <SvgImage
                icon="edit"
                height={14}
                width={14}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{capitalize(userData?.name)}</Text>
          <Text style={styles.userHandle}>@{userData?.username || 'user'}</Text>
        </View>

        {/* Info Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <SvgImage
                  icon="profile"
                  height={20}
                  width={20}
                  color={colors.primaryPink}
                />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>{userData?.name || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.emojiIcon}>📧</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue}>{userData?.email || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Text style={styles.emojiIcon}>🎂</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoValue}>
                  {userData?.age || 'N/A'} years
                </Text>
              </View>
            </View>

            <View style={[styles.infoItem, styles.lastInfoItem]}>
              <View style={styles.iconContainer}>
                <Text style={styles.emojiIcon}>
                  {userData?.gender === 'Male' ? '👨' : '👩'}
                </Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Gender</Text>
                <Text style={styles.infoValue}>
                  {userData?.gender || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.infoCard}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => setComingSoonVisible(true)}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: '#F0F7FF' }]}
              >
                <SvgImage icon="edit" height={18} width={18} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Edit Profile</Text>
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <SvgImage icon="back" height={14} width={14} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: '#FFF9F0' }]}
              >
                <SvgImage
                  icon="verification"
                  height={18}
                  width={18}
                  color="#FF9500"
                />
              </View>
              <Text style={styles.actionText}>Change Password</Text>
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <SvgImage icon="back" height={14} width={14} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionItem, styles.lastInfoItem]}
              onPress={handleDeleteAccount}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: '#FFF0F0' }]}
              >
                <SvgImage
                  icon="delete"
                  height={18}
                  width={18}
                  color="#FF3B30"
                />
              </View>
              <Text style={[styles.actionText, { color: '#FF3B30' }]}>
                Delete Account
              </Text>
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <SvgImage icon="back" height={14} width={14} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          buttontitle="Logout"
          onPress={handleLogout}
          loading={loading}
          style={styles.logoutButton}
        />
      </ScrollView>

      {/* Logout Popup */}
      <Popup
        visible={logoutVisible}
        title="Logout"
        message="Are you sure you want to logout?"
        titleColor={colors.primaryPink}
        icon="logout"
        onClose={() => setLogoutVisible(false)}
        buttons={[
          {
            text: 'Cancel',
            onPress: () => setLogoutVisible(false),
            style: 'secondary',
          },
          {
            text: 'Logout',
            onPress: onLogoutPress,
            style: 'primary',
          },
        ]}
        loading={loading}
      />

      {/* Delete Account Popup */}
      <Popup
        visible={deleteVisible}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action is irreversible."
        titleColor={colors.primaryPink}
        icon="delete"
        onClose={() => setDeleteVisible(false)}
        buttons={[
          {
            text: 'Cancel',
            onPress: () => setDeleteVisible(false),
            style: 'secondary',
          },
          {
            text: 'Delete',
            onPress: onDeletePress,
            style: 'primary',
          },
        ]}
        loading={loading}
        buttonColor={colors.primaryPink}
      />

      {/* Coming Soon Popup */}
      <Popup
        visible={comingSoonVisible}
        title="Coming Soon"
        message="Edit Profile functionality coming soon!"
        titleColor={colors.primaryPink}
        icon="edit"
        onClose={() => setComingSoonVisible(false)}
        buttons={[
          {
            text: 'OK',
            onPress: () => setComingSoonVisible(false),
            style: 'primary',
          },
        ]}
        buttonColor={colors.primaryPink}
      />
    </View>
  );
};

export default Profile;
