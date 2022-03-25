import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//IMPORT ROUTES
import AuthStack from './routes/auth';
import UserStack from './routes/user';
import HomeStack from './routes/home';

import AuthLoading from './scenes/auth/AuthLoading';
import AuthProvider from './provider';

//APP ROUTES STACK
const AppStack = createSwitchNavigator(
  {
    Loading: AuthLoading,
    Auth: AuthStack,
    User: UserStack,
    App: HomeStack,
  },
  {initialRouteName: 'Loading'},
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
