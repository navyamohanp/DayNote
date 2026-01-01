import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { colors } from '../../themes';

interface Props {
  buttontitle: string;
  onPress?: Function;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  buttonStyle?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
}

const PrimaryButton = ({
  buttontitle,
  onPress,
  disabled,
  loading,
  style,
  buttonStyle,
  textStyle,
}: Props) => {
  return (
    <View style={style}>
      <TouchableOpacity
        disabled={disabled || loading}
        onPress={() => {
          onPress();
        }}
      >
        <View
          style={[
            buttonStyle ? buttonStyle : styles.button,
            {
              backgroundColor: disabled ? colors.gray : colors.primaryPink,
            },
            disabled
              ? styles.disabledButton
              : buttonStyle
              ? buttonStyle
              : styles.enabledButton,
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={colors.white}
              style={styles.loadingIdicator}
            />
          ) : (
            <Text
              allowFontScaling={false}
              style={textStyle ? textStyle : styles.buttonText}
            >
              {buttontitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;
