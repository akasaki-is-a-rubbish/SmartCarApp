import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//IMPORT ROUTES
import AuthStack from './routes/auth';
import UserStack from './routes/user';
import HomeStack from './routes/home';

import AuthLoading from './scenes/auth/AuthLoading';
import AuthProvider from './provider';

const AppStack = createNativeStackNavigator();

export default function Router(props) {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppStack.Navigator initialRouteName="Loading">
          <AppStack.Screen name="Loading" component={AuthLoading} />
          <AppStack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
          <AppStack.Screen
            name="App"
            component={HomeStack}
            options={{headerShown: false}}
          />
          <AppStack.Screen name="User" component={UserStack} />
        </AppStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// //APP ROUTES STACK
// const AppStack = createSwitchNavigator(
//   {
//     Loading: AuthLoading,
//     Auth: AuthStack,
//     User: UserStack,
//     App: HomeStack,
//   },
//   {initialRouteName: 'App'},
// );

// const Navigator = createAppContainer(AppStack);

// export default function Router(props) {
//   return (
//     <AuthProvider>
//       <Navigator />
//     </AuthProvider>
//   );
// }
