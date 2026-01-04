import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';

interface JournalListItemProps {
  date: string;
  title: string;
  preview: string;
  mood: string;
  editedTime: string;
  onPress?: () => void;
  onMenuPress?: () => void;
}

const JournalListItem: React.FC<JournalListItemProps> = ({
  date,
  title,
  preview,
  mood,
  editedTime,
  onPress,
  onMenuPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.headerRight}>
            <Text style={styles.mood}>{mood}</Text>
            {onMenuPress && (
              <TouchableOpacity
                style={styles.menuButton}
                onPress={e => {
                  e.stopPropagation();
                  onMenuPress();
                }}
              >
                <Text style={styles.menuIcon}>⋮</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.preview} numberOfLines={5}>
          {preview}
        </Text>
        <Text style={styles.editedTime}>Edited at {editedTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JournalListItem;
