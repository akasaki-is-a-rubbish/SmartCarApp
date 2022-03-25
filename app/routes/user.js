import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import User from '../scenes/User/User';
import UpdateProfileScreen from '../scenes/User/UpdateProfile';

import {headerStyle, headerTitleStyle} from '../theme';

const UserStack = createStackNavigator(
  {
    User: User,
    UpdateProfile: UpdateProfileScreen,
  },
  {
    initialRouteName: 'User',
    defaultNavigationOptions: () => ({headerStyle, headerTitleStyle}),
  },
);

export default UserStack;
