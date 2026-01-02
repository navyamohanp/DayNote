import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VerificationHeader } from '../../../components/HeaderBackComponent/header';
import CustomTextInput from '../../../components/textInput';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import { styles } from './styles';
import Toaster from '../../../components/toasts/helper';
import SvgImage from '../../../utilities/svgIcons';
import { forgotPasswordApi } from '../../../api/authAPI';
import { validateEmail } from '../../../utilities/validations';

const ForgotPassword = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError(null);
    console.log('ewfrew');
    try {
      const res: any = await forgotPasswordApi({ email });

      if (!res || res.code !== 200) {
        Toaster.showToast(res?.message || 'Something went wrong', 'errorToast');
        return;
      } else {
        Toaster.showToast(res.message, 'successToast');
        navigation.navigate('Verification', {
          email,
        });
      }
    } catch (error) {
      Toaster.showToast('Network error. Please try again.', 'errorToast');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgImage icon="back" height={18} width={18} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password?</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            Enter your email address to receive an OTP.
          </Text>
        </View>

        <View style={styles.form}>
          <CustomTextInput
            label="Email ID"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (error) setError(null);
            }}
            placeholder="Enter your email"
            error={error}
          />
        </View>

        <PrimaryButton
          buttontitle="Submit"
          onPress={() => handleSubmit()}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
