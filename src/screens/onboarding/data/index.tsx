import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import CustomTextInput from '../../../components/textInput';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import Dropdown from '../../../components/dropDown';

const DataScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState<string | number>('');
  const [gender, setGender] = useState('');

  const ageOptions = Array.from({ length: 83 }, (_, i) => ({
    label: (i + 18).toString(),
    value: i + 18,
  }));

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

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
          label="Username (optional)"
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your username"
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
          console.log({ userName, age, gender });
          // navigation.navigate('NextScreen');
        }}
        style={styles.loginButton}
      />

      <View style={styles.signInContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signInText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DataScreen;
