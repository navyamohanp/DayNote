import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SvgImage from '../../utilities/svgIcons';
import { styles } from './styles';
import { colors } from '../../themes';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string | null;
  multiline?: boolean;
  numberOfLines?: number;
  inputStyle?: any;
  maxLength?: number;
  keyboardType?: any;
  editable?: boolean;
  onPress?: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = null,
  multiline = false,
  numberOfLines = 1,
  inputStyle,
  maxLength,
  keyboardType,
  editable = true,
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: -10,
    fontSize: 12,
    color: colors.labelGray,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 1,
  };

  const InputWrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <Text style={labelStyle as any}>{label}</Text>
      <InputWrapper
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.inputContainer,
          error ? styles.inputErrorBorder : styles.inputNormalBorder,
          isFocused && !error && styles.inputFocusedBorder,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.placeHolder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          autoCapitalize="none"
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          maxLength={maxLength}
          keyboardType={keyboardType}
          editable={editable}
          pointerEvents={onPress ? 'none' : 'auto'}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.eyeIcon}
          >
            <SvgImage
              icon={isPasswordVisible ? 'eye' : 'closedEye'}
              width={20}
              height={20}
              color={colors.lightgray}
            />
          </TouchableOpacity>
        )}
      </InputWrapper>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInput;
