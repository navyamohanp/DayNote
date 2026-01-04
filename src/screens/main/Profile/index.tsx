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

const Profile = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const userData = useSelector(
    (state: RootState) => state.authentication.userData,
  );

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
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
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const response: any = await deleteUserApi();
              if (response.code === 200) {
                await removeAllKeys();
                dispatch(logout());
              }
            } catch (error) {
              console.log('Delete account error:', error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarInitial}>
              {userData?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{capitalize(userData?.name)}</Text>
          <Text style={styles.userHandle}>@{userData?.username || 'user'}</Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userData?.email || 'N/A'}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{userData?.age || 'N/A'}</Text>
            </View>

            <View style={[styles.infoItem, styles.lastInfoItem]}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{userData?.gender || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.infoSection}>
          <Text style={[styles.userHandle, { marginLeft: 4, marginBottom: 8 }]}>
            Settings
          </Text>
          <View style={styles.infoCard}>
            <TouchableOpacity
              style={styles.infoItem}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <Text
                style={[styles.infoValue, { fontFamily: font.nunitoSemiBold }]}
              >
                Change Password
              </Text>
              <SvgImage
                icon="back"
                height={16}
                width={16}
                color={colors.gray}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.infoItem, styles.lastInfoItem]}
              onPress={handleDeleteAccount}
            >
              <Text
                style={[
                  styles.infoValue,
                  { color: '#FF4D4D', fontFamily: font.nunitoSemiBold },
                ]}
              >
                Delete Account
              </Text>
              <SvgImage icon="back" height={16} width={16} color="#FF4D4D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer / Logout */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
