import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//IMPORT SCENES
import User from '../scenes/user/User';
import UpdateProfileScreen from '../scenes/user/UpdateProfile';

import {headerStyle, headerTitleStyle} from '../theme';

export default function UserStack() {
  const UserStack = createNativeStackNavigator();
  return (
    <UserStack.Navigator
      initialRouteName="Userinfo"
      screenOptions={{
        headerStyle,
        headerTitleStyle,
      }}>
      <UserStack.Screen
        name="Userinfo"
        component={User}
        options={{
          headerShown: false,
        }}
      />
      <UserStack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </UserStack.Navigator>
  );
}
