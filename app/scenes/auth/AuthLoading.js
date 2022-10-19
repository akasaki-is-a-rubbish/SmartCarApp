/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Loading from '../../components/Loading';
import {useAuth} from '../../provider';

export default function AuthLoading(props) {
  const {navigate, reset} = props.navigation;
  const {getAuthState} = useAuth();
  //when component mounts, get auth state
  useEffect(() => {
    initialize();
  });

  //get auth state
  async function initialize() {
    if (await getAuthState()) {
      reset({
        index: 0,
        routes: [{name: 'App'}],
      });
    } else {
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
      <Loading />
    </View>
  );
}
