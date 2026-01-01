/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import navigationConfig from './config';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { colors, font, fontSize } from '../themes';
import SvgImage from '../utilities/svgIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/main/Home';
import strings from '../utilities/strings';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';
import Profile from '../screens/main/Profile';
import Journal from '../screens/main/Journal';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ ...navigationConfig, gestureEnabled: false }}
      initialRouteName={'HomeTabs'}
    >
      <Stack.Screen
        name="HomeTabs"
        component={NavBar}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const NavBar = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.min(insets.bottom, 12);
  const navigationBlocked = useSelector(state => state?.navigation?.blocked);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: 'below-icon',
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            height: 76 + bottomInset,
            paddingBottom: bottomInset,
            borderTopRightRadius: 22,
            borderTopLeftRadius: 22,

            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 12,
            backgroundColor: colors.white,
          },
          tabBarIconStyle: { marginTop: 12 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <SvgImage
                icon={'home'}
                height={24}
                width={24}
                strokeColor={!focused ? colors.gray : ''}
                color={!focused ? colors.white : ''}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: fontSize.small,
                  fontFamily: focused ? font.nunitoBold : font.nunitoMedium,
                  color: focused ? colors.primaryPink : colors.gray,
                }}
              >
                Home
              </Text>
            ),
            tabBarButton: props => (
              <TouchableWithoutFeedback
                {...props}
                onPress={() => {
                  if (!navigationBlocked && props.onPress) {
                    props.onPress();
                  }
                }}
              >
                <View style={[props.style, { flex: 1 }]}>{props.children}</View>
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name="Journal"
          component={Journal}
          options={{
            tabBarIcon: ({ focused }) => (
              <SvgImage
                icon={'journal'}
                height={30}
                width={32}
                color={focused ? colors.primaryPink : colors.gray}
                strokeColor={colors.white}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: fontSize.small,
                  fontFamily: focused ? font.nunitoBold : font.nunitoMedium,
                  color: focused ? colors.primaryPink : colors.gray,
                }}
              >
                My Journals
              </Text>
            ),
            tabBarButton: props => (
              <TouchableWithoutFeedback
                {...props}
                onPress={() => {
                  if (!navigationBlocked && props.onPress) {
                    props.onPress();
                  }
                }}
              >
                <View style={[props.style, { flex: 1 }]}>{props.children}</View>
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <SvgImage
                icon={'profile'}
                height={24}
                width={24}
                strokeColor={focused ? colors.primaryPink : colors.gray}
                color={focused ? colors.primaryPink : colors.gray}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: fontSize.small,
                  fontFamily: focused ? font.nunitoBold : font.nunitoMedium,
                  color: focused ? colors.primaryPink : colors.gray,
                }}
              >
                Profile
              </Text>
            ),
            tabBarButton: props => (
              <TouchableWithoutFeedback
                {...props}
                onPress={() => {
                  if (!navigationBlocked && props.onPress) {
                    props.onPress();
                  }
                }}
              >
                <View style={[props.style, { flex: 1 }]}>{props.children}</View>
              </TouchableWithoutFeedback>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainStack;
