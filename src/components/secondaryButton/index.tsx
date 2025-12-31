import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {colors} from '../../themes';

interface Props {
  buttontitle: string;
  onPress: Function;
  disabled?: boolean;
  loading?: boolean;
}

const SecondaryButton = ({buttontitle, onPress, disabled, loading}: Props) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          disabled ? styles.disabledButton : styles.enabledButton,
        ]}
        disabled={disabled}
        onPress={() => {
          onPress();
        }}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={colors.white}
            style={styles.loadingIdicator}
          />
        ) : (
          <Text allowFontScaling={false} style={styles.buttonText}>
            {buttontitle}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SecondaryButton;
