import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useMemo } from 'react';

import { styles } from './styles';
import SvgImage from '../../../utilities/svgIcons';
import { colors } from '../../../themes';
import { useFocusEffect } from '@react-navigation/native';
import { deleteJournalApi, getJournalsApi } from '../../../api/journalAPI';
import { ActivityIndicator } from 'react-native';
import Toast from '../../../components/toasts';
import Toaster from '../../../components/toasts/helper';

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  mood: string;
  journalDate: string;
  createdAt: string;
  updatedAt: string;
}

const Journal = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menu, setMenu] = useState<number | null>(null);

  // Sample journal data
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const response: any = await getJournalsApi();

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
    React.useCallback(() => {
      setMenu(null);
      fetchJournals();
    }, []),
  );

  const filteredJournals = useMemo(() => {
    return journals.filter(
      journal =>
        journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, journals]);

  // const handleFilter = () => {
  //   Alert.alert('Filter', 'Filter functionality coming soon!');
  // };

  const handleAddJournal = () => {
    navigation.navigate('AddJournal');
  };

  const handleDelete = async (id: string) => {
    const res = await deleteJournalApi(id);
    console.log(res, '=======res');
    if (res?.code === 200) {
      Toaster.showToast('Journal deleted successfully', 'successToast');
      fetchJournals();
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: JournalEntry;
    index: number;
  }) => {
    const date = new Date(item.journalDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const editedDate = new Date(item.updatedAt);
    const formattedTime = editedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

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

    return (
      <View>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => {
            if (menu !== null) {
              setMenu(null);
            }
          }}
        >
          {/* Header Section */}
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTitle}>{getMoodEmoji(item.mood)}</Text>
            </View>

            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => {
                setMenu(menu === index ? null : index);
              }}
            >
              <SvgImage
                icon={'menu'}
                height={18}
                width={18}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>

          {/* Body Section */}
          <View style={styles.cardBody}>
            <Text style={styles.previewText}>{item.content}</Text>
          </View>

          {/* Footer Section */}
          <View style={styles.cardFooter}>
            <View style={styles.dateContainer}>
              <SvgImage
                icon={'journal'}
                height={14}
                width={14}
                strokeColor={colors.textSecondary}
              />
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>

            <Text style={styles.editedTimeText}>Edited {formattedTime}</Text>
          </View>

          {menu === index && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setMenu(null);
                  navigation.navigate('EditJournal', item);
                }}
              >
                <SvgImage
                  icon={'edit'}
                  height={18}
                  width={18}
                  color={colors.black}
                />
                <Text allowFontScaling={false} style={styles.dropdownText}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setMenu(null);
                  handleDelete(item._id);
                }}
              >
                <SvgImage
                  icon={'delete'}
                  height={18}
                  width={18}
                  color={colors.black}
                />
                <Text allowFontScaling={false} style={styles.dropdownText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Journals</Text>
      </View>

      {/* Search and Filter Bar 
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SvgImage
            icon={'search'}
            height={20}
            width={20}
            color={colors.gray}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search journals..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <SvgImage
            icon={'filter'}
            height={18}
            width={18}
            color={colors.gray}
          />
        </TouchableOpacity>
      </View>*/}

      {/* Journal List */}
      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primaryPink} />
        </View>
      ) : (
        <FlatList
          data={filteredJournals}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No journals found</Text>
              <Text style={styles.emptySubtext}>
                {searchQuery
                  ? 'Try a different search term'
                  : 'Start writing your first journal entry'}
              </Text>
            </View>
          }
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddJournal}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Journal;
