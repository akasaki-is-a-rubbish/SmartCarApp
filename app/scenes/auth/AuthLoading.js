import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import {useAuth} from '../../provider';

export default function AuthLoading(props) {
  const {navigate} = props.navigation;
  const {getAuthState} = useAuth();

  //when component mounts, get auth state
  useEffect(() => {
    initialize();
  }, []);

  //get auth state
  async function initialize() {
    try {
      if (getAuthState()) {
        navigate('App');
      } else {
        navigate('Auth');
      }
    } catch (e) {
      navigate('Auth');
    }
  }
  return (
    <View
      style={{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <ActivityIndicator />
      <Text>{'Loading User Data'}</Text>
    </View>
  );
}
