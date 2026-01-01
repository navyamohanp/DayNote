import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import MoodSelector from '../../../components/moodSelector';
import EntryCard from '../../../components/entryCard';
import JournalListItem from './components/journalListItem';
import StreakCard from '../../../components/streakCard';

const Home = () => {
  // Sample data for recent journals
  const recentJournals = [
    {
      id: '1',
      date: 'Dec 31',
      title: "Spent New Year's Eve with friends",
      preview: 'Feeling grateful for the good times...',
      mood: '🙂',
      editedTime: '9:12 PM',
    },
    {
      id: '2',
      date: 'Dec 31',
      title: 'Feeling a bit overwhelmed today,',
      preview: 'but hopeful for a better tomorrow.',
      mood: '😐',
      editedTime: '5:45 PM',
    },
  ];

  const handleWriteNow = () => {
    console.log('Navigate to write entry screen');
  };

  const handleJournalPress = (id: string) => {
    console.log('Open journal:', id);
  };

  const handleViewAll = () => {
    console.log('Navigate to all journals');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi,</Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
          </View>
          <View style={styles.profilePicture}>
            <Text style={styles.profileInitial}>A</Text>
          </View>
        </View>

        {/* Mood Selector */}
        {/* <MoodSelector /> */}

        {/* Streak Card */}
        <StreakCard streakDays={5} />

        {/* Entry Card */}
        <EntryCard onPress={handleWriteNow} />
        {/* Recent Journals */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Journals</Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentJournals.map(journal => (
            <JournalListItem
              key={journal.id}
              date={journal.date}
              title={journal.title}
              preview={journal.preview}
              mood={journal.mood}
              editedTime={journal.editedTime}
              onPress={() => handleJournalPress(journal.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
