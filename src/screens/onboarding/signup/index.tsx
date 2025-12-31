import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import CustomTextInput from '../../../components/textInput';
import { styles } from './styles';
import { createAccountApi } from '../../../api/authAPI';

const SignUp = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = async () => {
    console.log(name, email, password);
    const response = await createAccountApi({ name, email, password });

    if (response?.code === 200) {
      navigation.navigate('Data', { id: response?.user?.id });
    } else {
      console.log('add error toast');
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
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <CustomTextInput
          label="Email ID"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter your password"
        />
      </View>

      <PrimaryButton
        buttontitle="Sign Up"
        onPress={() => createAccount()}
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
