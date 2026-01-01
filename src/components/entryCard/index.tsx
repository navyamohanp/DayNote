import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import PrimaryButton from '../primaryButton/primaryButton';

interface EntryCardProps {
  onPress?: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today's Entry</Text>
          <Text style={styles.subtitle}>Start writing your thoughts</Text>
        </View>
        <Image
          source={require('../../resources/images/book.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <PrimaryButton
        buttontitle="Write Now"
        onPress={onPress}
        // style={styles.loginButton}
      />
    </View>
  );
};

export default EntryCard;
