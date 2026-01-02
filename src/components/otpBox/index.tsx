import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';

import { styles } from './styles';
import { colors } from '../../themes';

interface OtpInputProps {
  otp: string[];
  setOtp: Function;
  isValid?: boolean;
  onInputChange?: () => void;
}
const OtpBox: React.FC<OtpInputProps> = p => {
  const [enteredOtp, setEnteredOtp] = useState<string>(''); // State to hold the entered OTP
  const inputRefs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const otpRef = useRef<string[]>(p.otp);

  const tintColor = p.isValid ? colors.primaryPink : 'red';
  const offTintColor = p.isValid ? colors.gray : 'red';

  useEffect(() => {
    otpRef.current = p.otp;
  }, [p.otp]);

  const handleChangeText = (index: number, value: string) => {
    if (p.onInputChange && !p.isValid) {
      p.onInputChange();
    }

    const newOtp = [...otpRef.current];

    if (value.length > 1) {
      // Handle multi-digit paste with a delay for each digit
      const digits = value.split('');

      digits.forEach((digit, i) => {
        setTimeout(() => {
          if (index + i < newOtp.length) {
            newOtp[index + i] = digit;
            p.setOtp([...newOtp]); // Spread to trigger re-render
            setEnteredOtp(newOtp.join(''));

            // Move focus gradually to the next box
            if (index + i < newOtp.length - 1) {
              inputRefs.current[index + i + 1]?.focus();
            }
          }
        }, i * 100); // Delay increases with each iteration
      });
    } else {
      // Handle single-digit entry
      newOtp[index] = value.charAt(0);
      p.setOtp(newOtp);
      setEnteredOtp(newOtp.join(''));

      if (value && index < newOtp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      const newOtp = [...otpRef.current];

      if (newOtp[index]) {
        newOtp[index] = ''; // Clear current box
        p.setOtp(newOtp);
        setEnteredOtp(newOtp.join(''));
      } else if (index > 0) {
        newOtp[index - 1] = ''; // Clear previous box
        p.setOtp(newOtp);
        setEnteredOtp(newOtp.join(''));
        inputRefs.current[index - 1]?.focus(); // Move focus back
      }
    }
  };

  const handleInputFocus = (index: number) => {
    inputRefs.current[index]?.focus();
    setFocusedIndex(index);
  };
  return (
    <View>
      <View style={styles.container}>
        {p.otp.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref!)}
            style={[
              styles.input,
              {
                borderColor: focusedIndex === index ? tintColor : offTintColor,
              },
            ]}
            value={value}
            onChangeText={text => handleChangeText(index, text)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(index, nativeEvent.key)
            }
            onFocus={() => handleInputFocus(index)}
            keyboardType="number-pad"
            autoFocus={index === 0}
            returnKeyType={'done'}
            selectionColor="pink"
            caretHidden={true}
            textContentType="oneTimeCode" // for keyboard flicker
            autoComplete="sms-otp" // for keyboard flicker - autofill
          />
        ))}
      </View>
    </View>
  );
};

export default OtpBox;
