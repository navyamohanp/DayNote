import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import CustomTextInput from '../../../components/textInput';
import { styles } from './styles';
import { loginApi } from '../../../api/authAPI';
import { login } from '../../../redux/reducers/authenticationReducer';
import { useDispatch } from 'react-redux';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const LoginApi = async () => {
    const response = await loginApi({ email, password });
    console.log('Login Response:', response, email, password);
    if (response?.code === 200) {
      dispatch(login());
    } else {
      console.log('add error toast');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.subtitle}>Sign in to continue!</Text>
      </View>

      <View style={styles.form}>
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
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        buttontitle="Login"
        onPress={() => {
          console.log('login');
          LoginApi();
        }}
        style={styles.loginButton}
      />

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>I'm a new user, </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signInLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
