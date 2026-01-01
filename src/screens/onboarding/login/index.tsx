import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PrimaryButton from '../../../components/primaryButton/primaryButton';
import CustomTextInput from '../../../components/textInput';
import { styles } from './styles';
import { loginApi } from '../../../api/authAPI';
import { login } from '../../../redux/reducers/authenticationReducer';
import { useDispatch } from 'react-redux';
import { validateLogin } from '../../../utilities/validations';
import Toaster from '../../../components/toasts/helper';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const dispatch = useDispatch();

  const LoginApi = async () => {
    const { isValid, errors: validationErrors } = validateLogin(
      email,
      password,
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const response: any = await loginApi({ email, password });
    console.log('Login Response:', response, email, password);
    if (response?.code === 200) {
      Toaster.showToast('Logged in successfully', 'successToast');
      dispatch(login());
    } else {
      Toaster.showToast(
        response?.message || 'Invalid credentials',
        'errorToast',
      );
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
        disabled={Object.values(errors).some(error => !!error)}
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
