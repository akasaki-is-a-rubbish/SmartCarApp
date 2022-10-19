import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//IMPORT SCENES
import Home from '../scenes/home/Home';
import QRScan from '../scenes/home/QRScan';
import Events from '../scenes/home/Events';
import ContactStack from './contact';
import UpdateContact from '../scenes/home/UpdateContact';
import WeekReport from '../scenes/home/WeekReport';
import HartRate from '../scenes/home/HartRate';
import Mileage from '../scenes/home/Mileage';
import Radar from '../scenes/home/Radar';

import {headerStyle, headerTitleStyle} from '../theme';

export default function HomeStack() {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle,
        headerTitleStyle,
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <HomeStack.Screen name="QRScan" component={QRScan} />
      <HomeStack.Screen
        name="Events"
        component={Events}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="Contact"
        component={ContactStack}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="UpdateContact"
        component={UpdateContact}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="WeekReport"
        component={WeekReport}
        options={{
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      />
      <HomeStack.Screen
        name="HartRate"
        component={HartRate}
        options={{
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      />
      <HomeStack.Screen
        name="Mileage"
        component={Mileage}
        options={{
          headerTitleAlign: 'center',
          animation: 'slide_from_left',
        }}
      />
      <HomeStack.Screen
        name="Radar"
        component={Radar}
        options={{
          headerTitleAlign: 'center',
          animation: 'slide_from_left',
        }}
      />
    </HomeStack.Navigator>
  );
}
