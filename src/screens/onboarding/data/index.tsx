import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import CustomTextInput from '../../../components/textInput';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import Dropdown from '../../../components/dropDown';
import { dataCollectionApi } from '../../../api/authAPI';
import { login } from '../../../redux/reducers/authenticationReducer';
import { useDispatch } from 'react-redux';
import { validateData } from '../../../utilities/validations';
import Toaster from '../../../components/toasts/helper';

const DataScreen = ({ navigation, route }: any) => {
  const { id } = route.params;
  const [username, setUserName] = useState('');
  const [age, setAge] = useState<string | number>('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState<{ username?: string }>({});

  const ageOptions = Array.from({ length: 88 }, (_, i) => ({
    label: (i + 13).toString(),
    value: i + 13,
  }));

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const dispatch = useDispatch();

  const onContinue = async () => {
    const { isValid, errors: validationErrors } = validateData(username);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const response: any = await dataCollectionApi({
      id,
      username,
      age,
      gender,
    });

    if (response?.code === 200) {
      console.log(response, '========res');
      // Toaster.showToast('Profile updated successfully.', 'successToast');
      dispatch(login());
    } else {
      Toaster.showToast(
        response?.message || 'Failed to update profile',
        'errorToast',
      );
      console.log('add error toast');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tell us about you</Text>
        <Text style={styles.subtitle}>
          This helps personalize yourNote experience.
        </Text>
      </View>

      <View style={styles.form}>
        <CustomTextInput
          label="Username"
          value={username}
          onChangeText={text => {
            setUserName(text);
            if (errors.username) {
              setErrors({ ...errors, username: '' });
            }
          }}
          placeholder="Enter your username"
          error={errors.username}
        />

        <View style={styles.inputSpacing}>
          <Dropdown
            label="Age (optional)"
            options={ageOptions}
            selectedValue={age}
            onValueChange={setAge}
            placeholder="Enter your age"
            maxHeight={200}
          />
        </View>

        <View style={styles.inputSpacing}>
          <Text style={styles.label}>Gender (optional)</Text>
          <View style={styles.genderContainer}>
            {genderOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderButton,
                  gender === option && styles.genderButtonSelected,
                ]}
                onPress={() => setGender(option)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === option && styles.genderTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <PrimaryButton
        buttontitle="Continue"
        onPress={() => {
          onContinue();
        }}
        disabled={!!errors.username}
        style={styles.loginButton}
      />
    </ScrollView>
  );
};

export default DataScreen;
