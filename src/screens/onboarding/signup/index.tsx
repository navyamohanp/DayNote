import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import CustomTextInput from '../../../components/textInput';
import { styles } from './styles';
import { createAccountApi } from '../../../api/authAPI';
import { validateSignup } from '../../../utilities/validations';
import Toaster from '../../../components/toasts/helper';

const SignUp = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const createAccount = async () => {
    const { isValid, errors: validationErrors } = validateSignup(
      name,
      email,
      password,
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log(name, email, password);
    const response: any = await createAccountApi({ name, email, password });

    if (response?.code === 200) {
      Toaster.showToast('User registered successfully', 'successToast');
      navigation.navigate('Data', { id: response?.user?.id });
    } else {
      Toaster.showToast(
        response?.message || 'Something went wrong',
        'errorToast',
      );
      console.log(response, '=====resp');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account,</Text>
        <Text style={styles.subtitle}>Sign up to get started!</Text>
      </View>

      <View style={styles.form}>
        <CustomTextInput
          label="Full Name"
          value={name}
          onChangeText={text => {
            setName(text);
            if (errors.name) {
              setErrors({ ...errors, name: '' });
            }
          }}
          placeholder="Enter your name"
          error={errors.name}
        />
        <CustomTextInput
          label="Email ID"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (errors.email) {
              setErrors({ ...errors, email: '' });
            }
          }}
          placeholder="Enter your email"
          error={errors.email}
        />
        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (errors.password) {
              setErrors({ ...errors, password: '' });
            }
          }}
          secureTextEntry
          placeholder="Enter your password"
          error={errors.password}
        />
      </View>

      <PrimaryButton
        buttontitle="Sign Up"
        onPress={() => createAccount()}
        disabled={Object.values(errors).some(error => !!error)}
        style={styles.loginButton}
      />

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>I'm already a member, </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
