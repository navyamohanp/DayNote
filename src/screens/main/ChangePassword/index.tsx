import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import SvgImage from '../../../utilities/svgIcons';
import { colors } from '../../../themes';
import CustomTextInput from '../../../components/textInput';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import { changePasswordApi } from '../../../api/authAPI';
import Toaster from '../../../components/toasts/helper';
import { validateResetPassword } from '../../../utilities/validations';

const ChangePassword = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async () => {
    const validationErrors = validateResetPassword(
      newPassword,
      confirmPassword,
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!oldPassword) {
      setErrors({ oldPassword: 'Old password is required' });
      return;
    }

    setLoading(true);
    try {
      const response: any = await changePasswordApi({
        oldPassword,
        newPassword,
      });

      if (response.code === 200) {
        Toaster.showToast('Password changed successfully', 'successToast');
        navigation.goBack();
      } else {
        Toaster.showToast(
          response.message || 'Failed to change password',
          'errorToast',
        );
      }
    } catch (error) {
      console.log('Change password error:', error);
      Toaster.showToast('Something went wrong', 'errorToast');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <SvgImage icon="back" height={24} width={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.form}
        >
          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Old Password"
              placeholder="Enter old password"
              value={oldPassword}
              onChangeText={text => {
                setOldPassword(text);
                setErrors({ ...errors, oldPassword: '' });
              }}
              secureTextEntry
              error={errors.oldPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomTextInput
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={text => {
                setNewPassword(text);
                setErrors({ ...errors, password: '' });
              }}
              secureTextEntry
              error={errors.password}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setErrors({ ...errors, confirmPassword: '' });
              }}
              secureTextEntry
              error={errors.confirmPassword}
            />
          </View>

          <PrimaryButton
            buttontitle="Change Password"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
