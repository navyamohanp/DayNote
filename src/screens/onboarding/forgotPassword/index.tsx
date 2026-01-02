import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VerificationHeader } from '../../../components/HeaderBackComponent/header';
import CustomTextInput from '../../../components/textInput';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import { styles } from './styles';
import Toaster from '../../../components/toasts/helper';

const ForgotPassword = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError(null);
    // Logic for forgot password API call would go here
    Toaster.showToast('Password reset link sent to your email', 'successToast');
    navigation.navigate('Verification', { email });
  };

  return (
    <View style={styles.container}>
      <VerificationHeader onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password?</Text>
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
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
