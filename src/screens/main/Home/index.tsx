import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import EntryCard from '../../../components/entryCard';
import JournalListItem from './components/journalListItem';
import StreakCard from '../../../components/streakCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Home = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const userData = useSelector(
    (state: RootState) => state.authentication.userData,
  );
  console.log(userData);
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
    navigation.navigate('AddJournal');
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
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hi{' '}
              {userData?.name
                ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
                : ''}
              ,
            </Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
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
