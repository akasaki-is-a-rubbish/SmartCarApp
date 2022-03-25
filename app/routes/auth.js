import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//IMPORT SCENES
import RegisterScreen from '../scenes/auth/Register';
import LoginScreen from '../scenes/auth/Login';
import ForgotPasswordScreen from '../scenes/auth/ForgotPassword';

import {headerStyle, headerTitleStyle} from '../theme';

export default function AuthStack() {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle,
        headerTitleStyle,
      }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}
