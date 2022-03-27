import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//IMPORT SCENES
import Home from '../scenes/home/Home';
import QRScan from '../scenes/home/QRScan';
import Events from '../scenes/home/Events';

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
    </HomeStack.Navigator>
  );
}

//Create Routes
// const HomeStack = createNativeStackNavigator(
// {
//   Home: Home,
//   QRScan: QRScan,
// },
// {
//   initialRouteName: 'Home',
//   defaultNavigationOptions: () => ({headerStyle, headerTitleStyle}),
// },
// );

// export default HomeStack;
