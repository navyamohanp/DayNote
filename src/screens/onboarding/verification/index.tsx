import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { VerificationHeader } from '../../../components/HeaderBackComponent/header';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
// import { resendOtpApi, verifyOtpApi } from '../../../api/authAPI';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OtpBox from '../../../components/otpBox';
import styles from './styles';
import SvgImage from '../../../utilities/svgIcons';
import Toaster from '../../../components/toasts/helper';
import { colors } from '../../../themes';
import { verifyOtpApi } from '../../../api/authAPI';

const Verification = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { email } = route.params;
  const [isValid, setIsValid] = useState(true);
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const otpRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const maskEmail = (email: string) => {
    if (!email) return '';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `${user}***@${domain}`;
    return `${user.substring(0, 2)}***@${domain}`;
  };

  const validateOTP = async (enteredOtp: string) => {
    setLoading(true);
    try {
      const response = await verifyOtpApi({
        email: email,
        otp: enteredOtp,
      });
      if (response.code === 200) {
        Toaster.showToast(response.message, 'successToast');
        navigation.navigate('ResetPassword', { email });
      } else {
        Toaster.showToast(response.message, 'errorToast');

        setIsValid(false);
      }
    } catch (error) {
      Toaster.showToast(error.message, 'errorToast');
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setIsResendDisabled(true);
      // Logic to resend OTP
      // After API call, you might want to re-enable it after a short delay or immediately
      setTimeout(() => setIsResendDisabled(false), 2000); // Prevent accidental double taps

      //   const response = await resendOtpApi({
      //     email: email,
      //   });

      //   if (response) {
      //   } else {
      //   }
    } catch (error) {}
  };

  const submitOtp = () => {
    const combinedOtp = otp.join('');
    if (combinedOtp.length === 4) {
      validateOTP(combinedOtp);

      // navigation.navigate('ResetPassword');
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      Keyboard.dismiss();
    }
  }, [otp]);

  const handleInputChange = () => {
    if (!isValid) {
      setIsValid(true);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgImage icon="back" height={18} width={18} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
      </View>
      <View style={styles.lockImageContainer}>
        <SvgImage icon="verification" height={130} width={130} />
      </View>
      <View style={styles.titleContainer}>
        <Text allowFontScaling={false} style={styles.verificationTitleText}>
          An OTP has been sent to <Text>{maskEmail(email)}</Text>
        </Text>
      </View>

      <View style={styles.otpContainer}>
        <OtpBox
          otp={otp}
          setOtp={setOtp}
          isValid={isValid}
          onInputChange={handleInputChange}
        />
      </View>

      <View style={styles.resendOtpContainer}>
        {!isValid && (
          <Text allowFontScaling={false} style={styles.invalidOtpText}>
            Invalid verification code.
          </Text>
        )}

        <View style={styles.textContainer}>
          <Text allowFontScaling={false} style={[styles.didntreceiveCode]}>
            OTP not received?
          </Text>

          <TouchableOpacity onPress={resendOtp} disabled={isResendDisabled}>
            <Text
              allowFontScaling={false}
              style={[
                styles.resend,
                { color: isResendDisabled ? '#C1C7C1' : colors.primaryPink },
              ]}
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.submitButton}>
        <PrimaryButton
          buttontitle="Verify"
          onPress={submitOtp}
          disabled={otp.includes('') || success}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default Verification;
