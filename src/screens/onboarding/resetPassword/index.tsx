import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VerificationHeader } from '../../../components/HeaderBackComponent/header';
import CustomTextInput from '../../../components/textInput';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import { styles } from './styles';
import { validateResetPassword } from '../../../utilities/validations';
import Toaster from '../../../components/toasts/helper';
import SvgImage from '../../../utilities/svgIcons';

const ResetPassword = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleResetPassword = () => {
    const { isValid, errors: validationErrors } = validateResetPassword(
      password,
      confirmPassword,
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    // Logic for reset password API call would go here
    Toaster.showToast('Password reset successfully', 'successToast');
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgImage icon="back" height={18} width={18} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <CustomTextInput
            label="New Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errors.password) {
                setErrors({ ...errors, password: '' });
              }
            }}
            placeholder="Enter new password"
            secureTextEntry
            error={errors.password}
          />
          <CustomTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              if (errors.confirmPassword) {
                setErrors({ ...errors, confirmPassword: '' });
              }
            }}
            placeholder="Confirm new password"
            secureTextEntry
            error={errors.confirmPassword}
          />
        </View>

        <PrimaryButton
          buttontitle="Reset Password"
          onPress={handleResetPassword}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
};

export default ResetPassword;
