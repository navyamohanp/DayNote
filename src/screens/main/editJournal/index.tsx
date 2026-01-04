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

import { updateJournalApi } from '../../../api/journalAPI';
import Toaster from '../../../components/toasts/helper';
import { validateJournal } from '../../../utilities/validations';
import { MoodSelector } from '../../../components/moodSelector';

const EditJournal = ({ route }: any) => {
  const data = route.params;

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const formatInitialDate = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [date, setDate] = useState(formatInitialDate(data.journalDate));
  const [selectedMood, setSelectedMood] = useState<string | null>(data.mood);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const hasErrors = Object.values(errors).some(Boolean);

  const formatDateInput = (text: string) => {
    // Remove everything except digits
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    } else if (cleaned.length >= 5) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(
        2,
        4,
      )}-${cleaned.slice(4, 8)}`;
    }

    return formatted;
  };

  const handleEdit = async () => {
    const validationErrors = validateJournal({
      title,
      content,
      mood: selectedMood,
      journalDate: date,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    setLoading(true);
    try {
      const response: any = await updateJournalApi(data._id, {
        title,
        content,
        mood: selectedMood,
        journalDate: date,
      });

      setLoading(false);
      if (response?.code == 200) {
        Toaster.showToast('Journal updated successfully', 'successToast');
        navigation.goBack();
      } else {
        Toaster.showToast(
          response?.message || 'Failed to update journal entry.',
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
          <Text style={styles.headerTitle}>Edit journal</Text>
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
            placeholder="MM-DD-YYYY"
            value={date}
            keyboardType="numeric"
            onChangeText={text => {
              const formattedDate = formatDateInput(text);
              setDate(formattedDate);

              if (errors.journalDate) {
                setErrors({ ...errors, journalDate: '' });
              }
            }}
            error={errors.journalDate}
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
              buttontitle="Update"
              onPress={handleEdit}
              loading={loading}
              disabled={hasErrors}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditJournal;
