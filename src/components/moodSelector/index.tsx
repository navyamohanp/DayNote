import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { colors } from '../../themes';

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = ['😔', '🙂', '😊', '🤩'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Mood</Text>
      </View>
      <View style={styles.moodContainer}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={styles.moodButton}
            onPress={() => setSelectedMood(index)}
          >
            {selectedMood === index ? (
              <View
                style={[
                  styles.moodButtonGradient,
                  { backgroundColor: colors.primaryPink },
                ]}
              >
                <Text style={styles.moodEmoji}>{mood}</Text>
              </View>
            ) : (
              <Text style={styles.moodEmoji}>{mood}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subtitle}>Tap to reflect on your feelings</Text>
    </View>
  );
};

export default MoodSelector;
