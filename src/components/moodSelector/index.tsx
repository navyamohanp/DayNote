import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../themes';
import { styles } from './styles';

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
  errors?: string;
}

export const MoodSelector = ({
  selectedMood,
  onMoodSelect,
  errors,
}: MoodSelectorProps) => {
  const moods = [
    { value: 'sad', emoji: '😔' },
    { value: 'neutral', emoji: '🙂' },
    { value: 'happy', emoji: '😊' },
    { value: 'very_happy', emoji: '🤩' },
  ];

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.moodContainer}>
          {moods.map(mood => (
            <TouchableOpacity
              key={mood.value}
              style={styles.moodButton}
              onPress={() => onMoodSelect(mood.value)}
            >
              {selectedMood === mood.value ? (
                <View
                  style={[
                    styles.moodButtonGradient,
                    { backgroundColor: colors.primaryPink },
                  ]}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                </View>
              ) : (
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {errors ? <Text style={styles.errorText}>{errors}</Text> : null}
    </View>
  );
};
