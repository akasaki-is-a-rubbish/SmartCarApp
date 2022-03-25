import React from 'react';
import {Text, View, Button} from 'react-native';

import {useAuth} from '../../provider';

export default function User(props) {
  const {navigate} = props.navigation;

  const {state, handleLogout} = useAuth();
  const user = state.user;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{`Welcome ${user}`}</Text>

      <Button
        title={'Update Profile'}
        onPress={() => navigate('UpdateProfile')}
      />

      <Button
        title={'Log Out'}
        onPress={() => {
          handleLogout();
          navigate('Auth');
        }}
      />
    </View>
  );
}
