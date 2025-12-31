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
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { colors } from '../../themes';

interface Props {
  buttontitle: string;
  onPress: Function;
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
        <LinearGradient
          colors={
            disabled ? [colors.gray, colors.gray] : ['#FF6584', '#FF8B7B']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            buttonStyle ? buttonStyle : styles.button,
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
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;
