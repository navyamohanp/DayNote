import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {styles} from './style';

interface Props {
  message?: string;
  onPress?: () => void;
  buttonPresent?: boolean;
  buttonTitle?: string;
  image?: ImageSourcePropType;
}

const noop = () => {};

export const EmptyView = ({
  message,
  onPress = noop,
  buttonPresent,
  buttonTitle,
  image,
}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={{height: 103, width: 137.33, resizeMode: 'contain'}}
      />

      <Text allowFontScaling={false} style={styles.infoText}>
        {message}
      </Text>
      {buttonPresent ? (
        <TouchableOpacity onPress={onPress}>
          <Text>{buttonTitle}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
