import React, {useContext} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//IMPORT ROUTES
import AuthStack from './routes/auth';
import UserStack from './routes/user';
import HomeStack from './routes/home';

import AuthLoading from './scenes/auth/AuthLoading';

import {AuthContext} from './provider';

const AppStack = createNativeStackNavigator();

// if user is logged in---> go to home
// else---> go to auth
export default function Router(props) {
  const {state} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Loading">
        <AppStack.Screen name="Loading" component={AuthLoading} />
        {state.isLoggedIn ? (
          <>
            <AppStack.Screen
              name="App"
              component={HomeStack}
              options={{headerShown: false}}
            />
            <AppStack.Screen
              name="Auth"
              component={AuthStack}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <AppStack.Screen name="User" component={UserStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
