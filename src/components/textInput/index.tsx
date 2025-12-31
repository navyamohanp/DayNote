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
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = null,
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

  return (
    <View style={styles.container}>
      <Text style={labelStyle as any}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputErrorBorder : styles.inputNormalBorder,
          isFocused && !error && styles.inputFocusedBorder,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.placeHolder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          autoCapitalize="none"
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
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInput;
