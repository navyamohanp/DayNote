import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';

interface StreakCardProps {
  streakDays: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ streakDays }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🔥</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{streakDays} Day Streak</Text>
          <Text style={styles.subtitle}>Keep going!</Text>
        </View>
      </View>
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </View>
  );
};

export default StreakCard;
