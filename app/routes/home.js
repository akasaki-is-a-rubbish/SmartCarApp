import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import Home from '../scenes/home/Home';
import QRScan from '../scenes/home/QRScan';

import {headerStyle, headerTitleStyle} from '../theme';

//Create Routes
const HomeStack = createStackNavigator(
  {
    Home: Home,
    QRScan: QRScan,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: () => ({headerStyle, headerTitleStyle}),
  },
);

export default HomeStack;
