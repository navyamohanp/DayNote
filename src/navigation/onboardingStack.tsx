import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import navigationConfig from './config';
import Signup from '../screens/onboarding/signup';
import Login from '../screens/onboarding/login';
import ForgotPassword from '../screens/onboarding/forgotPassword';
import { isInitialInstall } from '../utilities/asyncStore';
import { useEffect } from 'react';
import DataScreen from '../screens/onboarding/data';
import Verification from '../screens/onboarding/verification';
import ResetPassword from '../screens/onboarding/resetPassword';

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  const [val, setVal] = React.useState<boolean | null>(null);

  // useEffect(() => {
  //   const checkInitialInstall = async () => {
  //     const value = await isInitialInstall();
  //     setVal(value);
  //   };
  //   checkInitialInstall();
  // }, []);

  // if (val === null) return null;

  return (
    <Stack.Navigator
      screenOptions={{ ...navigationConfig, gestureEnabled: false }}
      initialRouteName={'ForgotPassword'}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Data"
        component={DataScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
