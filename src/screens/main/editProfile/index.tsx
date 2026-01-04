import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setUserData } from '../../../redux/reducers/authenticationReducer';
import { editProfileApi } from '../../../api/commonAPI';
import SvgImage from '../../../utilities/svgIcons';
import CustomTextInput from '../../../components/textInput';
import Dropdown from '../../../components/dropDown';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import Toaster from '../../../components/toasts/helper';
import { colors } from '../../../themes';

const EditProfile = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.authentication.userData,
  );

  const [name, setName] = useState(userData?.name || '');
  const [age, setAge] = useState(userData?.age?.toString() || '');
  const [gender, setGender] = useState(userData?.gender || '');
  const [username, setUsername] = useState(userData?.username || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
    { label: 'Prefer not to say', value: 'Prefer not to say' },
  ];

  const handleUpdate = async () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!age.trim()) newErrors.age = 'Age is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!username.trim()) newErrors.username = 'Username is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        username,
        age: Number(age),
        gender,
      };
      const response: any = await editProfileApi(payload);

      if (response.code === 200) {
        Toaster.showToast('Profile updated successfully', 'successToast');
        // Update local redux state with new data
        dispatch(setUserData({ ...userData, ...payload }));
        navigation.goBack();
      } else {
        Toaster.showToast(
          response.message || 'Failed to update profile',
          'errorToast',
        );
      }
    } catch (error: any) {
      console.log('Edit profile error:', error);
      Toaster.showToast(error?.message || 'Something went wrong', 'errorToast');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgImage icon="back" height={18} width={18} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.form}
        >
          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={text => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              error={errors.name}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Username"
              placeholder="Enter username"
              value={username}
              onChangeText={text => {
                setUsername(text);
                if (errors.username) setErrors({ ...errors, username: '' });
              }}
              error={errors.username}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Age"
              placeholder="Enter your age"
              value={age}
              keyboardType="numeric"
              onChangeText={text => {
                setAge(text);
                if (errors.age) setErrors({ ...errors, age: '' });
              }}
              error={errors.age}
            />
          </View>

          <View style={styles.inputContainer}>
            <Dropdown
              label="Gender"
              placeholder="Select Gender"
              options={genderOptions}
              selectedValue={gender}
              onValueChange={value => {
                setGender(value.toString());
                if (errors.gender) setErrors({ ...errors, gender: '' });
              }}
              style={{ marginHorizontal: 0 }}
            />
            {errors.gender && (
              <Text
                style={{
                  color: colors.errorTxt,
                  fontSize: 12,
                  marginLeft: 4,
                  marginTop: 4,
                }}
              >
                {errors.gender}
              </Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              buttontitle="Save Changes"
              onPress={handleUpdate}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
