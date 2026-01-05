import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import CustomTextInput from '../../../components/textInput';

import PrimaryButton from '../../../components/primaryButton/primaryButton';
import { useNavigation } from '@react-navigation/native';
import SvgImage from '../../../utilities/svgIcons';

import { createJournalApi } from '../../../api/journalAPI';
import Toaster from '../../../components/toasts/helper';
import { validateJournal } from '../../../utilities/validations';
import { MoodSelector } from '../../../components/moodSelector';
import DatePicker from 'react-native-date-picker';

const AddJournal = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const hasErrors = Object.values(errors).some(Boolean);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleCreate = async () => {
    const validationErrors = validateJournal({
      title,
      content,
      mood: selectedMood,
      journalDate: dateString,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    setLoading(true);
    try {
      const response: any = await createJournalApi({
        title,
        content,
        mood: selectedMood || undefined,
        journalDate: dateString,
      });

      setLoading(false);
      if (response?.code == 200) {
        Toaster.showToast('Journal created successfully', 'successToast');
        navigation.goBack();
      } else {
        Toaster.showToast(
          response?.message || 'Failed to create journal entry.',
          'errorToast',
        );
      }
    } catch (error: any) {
      setLoading(false);
      Toaster.showToast(
        error?.message || 'An unexpected error occurred.',
        'errorToast',
      );
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgImage icon="back" height={18} width={18} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create new journal</Text>
        </View>
        <View style={styles.form}>
          <CustomTextInput
            label="Title"
            placeholder="Enter title"
            value={title}
            onChangeText={text => {
              setTitle(text);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            maxLength={100}
            error={errors.title}
          />

          <CustomTextInput
            label="Date"
            placeholder="Select date"
            value={dateString}
            editable={false}
            onPress={() => setOpen(true)}
            onChangeText={() => {}}
            error={errors.journalDate}
          />

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              const formatted = formatDate(date);
              setDateString(formatted);
              if (errors.journalDate) {
                setErrors({ ...errors, journalDate: '' });
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <View style={styles.moodHeader}>
            <Text style={styles.moodTitle}>Today's Mood</Text>
          </View>
          <MoodSelector
            selectedMood={selectedMood}
            onMoodSelect={(mood: React.SetStateAction<string | null>) => {
              setSelectedMood(mood);

              // ✅ Clear mood error immediately
              setErrors((prev: any) => ({
                ...prev,
                mood: '',
              }));
            }}
            errors={errors.mood}
          />

          <View style={styles.moodHeader}>
            <Text style={styles.contentTitle}>What's on your mind?</Text>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              placeholder="Write your thoughts here..."
              value={content}
              onChangeText={text => {
                setContent(text);
                if (errors.content) setErrors({ ...errors, content: '' });
              }}
              multiline={true}
              style={styles.contentInput}
              maxLength={500}
            />
          </View>
          {errors.content && (
            <Text style={styles.errorText}>{errors.content}</Text>
          )}

          <View style={styles.buttonContainer}>
            <PrimaryButton
              buttontitle="Create"
              onPress={handleCreate}
              loading={loading}
              disabled={hasErrors}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddJournal;
