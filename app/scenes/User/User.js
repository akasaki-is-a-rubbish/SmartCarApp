import React from 'react';
import {Text, View, Image} from 'react-native';
import {useAuth} from '../../provider';
import {useTailwind} from 'tailwind-rn';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function User(props) {
  const {navigate} = props.navigation;

  const {state, handleLogout} = useAuth();
  const user = state.user;
  const tailwind = useTailwind();
  return (
    <LinearGradient
      colors={['#fff1eb', '#ace0f9']}
      useAngle={true}
      angle={135}
      angleCenter={{x: 0.5, y: 0.5}}
      style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={tailwind(
          'mx-auto bg-white rounded-xl p-6 flex flex-row items-center',
        )}>
        <Image
          source={require('../../src/img/user.jpg')}
          style={{borderRadius: 50, width: 100, height: 100}}
        />
        <View style={tailwind('ml-4 flex flex-col')}>
          <Text style={tailwind('font-black text-3xl')}>{`Hello ${user}`}</Text>
          <Button
            title={'Update Profile'}
            type="outline"
            buttonStyle={{
              borderColor: 'rgba(78, 116, 289, 1)',
              borderWidth: 1,
              borderRadius: 20,
            }}
            titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
            containerStyle={{marginHorizontal: 20, marginVertical: 10}}
            onPress={() => navigate('UpdateProfile')}
          />
          <Button
            title={'Log Out'}
            type="outline"
            buttonStyle={{
              borderColor: 'rgba(78, 116, 289, 1)',
              borderWidth: 1,
              borderRadius: 20,
            }}
            titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
            containerStyle={{marginHorizontal: 20, marginVertical: 10}}
            onPress={() => {
              handleLogout();
              navigate('Auth');
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
