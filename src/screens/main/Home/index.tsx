import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import EntryCard from '../../../components/entryCard';
import JournalListItem from './components/journalListItem';
import StreakCard from '../../../components/streakCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getJournalsApi } from '../../../api/journalAPI';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../../../themes';

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  mood: string;
  journalDate: string;
  createdAt: string;
  updatedAt: string;
}

const Home = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const userData = useSelector(
    (state: RootState) => state.authentication.userData,
  );

  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const response: any = await getJournalsApi(1, 5);
      console.log(response, 'response');
      if (response?.code === 200) {
        setJournals(response.data);
      }
    } catch (error) {
      console.log('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchJournals();
    }, []),
  );

  const handleWriteNow = () => {
    navigation.navigate('AddJournal');
  };

  const handleJournalPress = (journal: JournalEntry) => {
    navigation.navigate('EditJournal', journal);
  };

  const handleViewAll = () => {
    navigation.navigate('Journal');
  };

  const getMoodEmoji = (moodValue: string) => {
    const moods = [
      { value: 'sad', emoji: '😔' },
      { value: 'neutral', emoji: '🙂' },
      { value: 'happy', emoji: '😊' },
      { value: 'very_happy', emoji: '🤩' },
    ];
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.emoji : '🙂';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: 10,
            paddingBottom: insets.bottom + 100,
          },
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

          {loading ? (
            <ActivityIndicator
              size="small"
              color={colors.primaryPink}
              style={{ marginTop: 20 }}
            />
          ) : journals.length > 0 ? (
            journals.map(journal => (
              <JournalListItem
                key={journal._id}
                date={formatDate(journal.journalDate)}
                title={journal.title}
                preview={journal.content}
                mood={getMoodEmoji(journal.mood)}
                editedTime={formatTime(journal.updatedAt)}
                onPress={() => handleJournalPress(journal)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>
              No journals yet. Start writing!
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
