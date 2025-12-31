import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SvgImage from '../../utilities/svgIcons';
import styles from './styles';

export const VerificationHeader = ({title, onPress}: any) => {
  return (
    <View style={styles.Header}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <SvgImage icon={'back'} height={18} width={18} />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};
