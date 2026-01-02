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
import { resetPasswordApi } from '../../../api/authAPI';

const ResetPassword = ({ navigation, route }: any) => {
  const email = route.params.email;
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleResetPassword = async () => {
    const { isValid, errors: validationErrors } = validateResetPassword(
      password,
      confirmPassword,
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await resetPasswordApi({
        email: email,
        password: confirmPassword,
      });
      if (response.code === 200) {
        Toaster.showToast(response.message, 'successToast');
        navigation.navigate('Login');
      }
    } catch (error) {
      Toaster.showToast('Something went wrong', 'errorToast');
    }
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
