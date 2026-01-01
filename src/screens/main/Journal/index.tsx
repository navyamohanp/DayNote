import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { styles } from './styles';
import SvgImage from '../../../utilities/svgIcons';
import { colors } from '../../../themes';
import { useFocusEffect } from '@react-navigation/native';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  preview: string;
  mood: string;
  editedTime: string;
}

const Journal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menu, setMenu] = useState<number | null>(null);

  // Sample journal data
  const [journals, setJournals] = useState<JournalEntry[]>([
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
    {
      id: '3',
      date: 'Dec 30',
      title: 'Great day at work!',
      preview:
        'Completed the project ahead of schedule and got positive feedback...',
      mood: '😊',
      editedTime: '8:30 PM',
    },
    {
      id: '4',
      date: 'Dec 29',
      title: 'Feeling under the weather',
      preview: 'Not feeling my best today, took it easy and rested...',
      mood: '😔',
      editedTime: '6:15 PM',
    },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      setMenu(null);
    }, []),
  );

  const filteredJournals = useMemo(() => {
    return journals.filter(
      journal =>
        journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.preview.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, journals]);

  const handleFilter = () => {
    Alert.alert('Filter', 'Filter functionality coming soon!');
  };

  const handleAddJournal = () => {
    Alert.alert('Add Journal', 'Add journal functionality coming soon!');
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: JournalEntry;
    index: number;
  }) => {
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
            <View>
              <Text style={styles.cardTitle}>Titlee {item.mood}</Text>
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
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.previewText} numberOfLines={2}>
              {item.preview}
            </Text>
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
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <Text style={styles.editedTimeText}>Edited {item.editedTime}</Text>
          </View>

          {menu === index && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setMenu(null);
                  Alert.alert('Edit', 'Edit functionality coming soon!');
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
                  Alert.alert('Delete', 'Delete functionality coming soon!');
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Journals</Text>
      </View>

      {/* Search and Filter Bar */}
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
      </View>

      {/* Journal List */}
      <FlatList
        data={filteredJournals}
        keyExtractor={item => item.id}
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

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddJournal}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Journal;
