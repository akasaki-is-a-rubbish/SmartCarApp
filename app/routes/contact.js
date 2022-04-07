import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Emergency from '../scenes/contact/Emergency';
import AddContact from '../scenes/contact/AddContact';

export default function ContactStack() {
  const ContactStack = createNativeStackNavigator();
  return (
    <ContactStack.Navigator
      initialRouteName="Emergency"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ContactStack.Screen
        name="Emergency"
        component={Emergency}
        options={{
          headerTitle: '紧急联系人',
        }}
      />
      <ContactStack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          headerTitle: '添加紧急联系人',
        }}
      />
    </ContactStack.Navigator>
  );
}
