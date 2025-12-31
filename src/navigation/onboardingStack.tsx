import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import navigationConfig from './config';
import Signup from '../screens/auth/signup';
import Login from '../screens/auth/login';
import { isInitialInstall } from '../utilities/asyncStore';
import { useEffect } from 'react';

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
      initialRouteName={'Signup'}
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
    </Stack.Navigator>
  );
};

export default OnboardingStack;
