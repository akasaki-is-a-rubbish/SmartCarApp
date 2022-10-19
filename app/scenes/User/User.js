import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
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
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{flex: 1}}>
      <View style={tailwind('p-4 flex flex-col')}>
        <TouchableOpacity onPress={() => this.navigation.navigate('User')}>
          <Image
            source={require('../../src/img/user.jpg')}
            style={tailwind(
              'rounded-full h-64 w-64 mt-40 ml-20 mb-10 translate-xy-lts',
            )}
          />
        </TouchableOpacity>
        <Text
          style={tailwind(
            'ml-4 font-black text-4xl text-sky-900',
          )}>{`${user}`}</Text>
        <Text style={tailwind('ml-4 font-black text-xl text-gray-400')}>
          {'me@puqing.work'}
        </Text>
        <View style={tailwind('flex flex-col')}>
          <Button
            title={'修改用户名'}
            titleStyle={tailwind('text-sky-900')}
            buttonStyle={tailwind('bg-white border-gray-700 border-2')}
            containerStyle={{marginHorizontal: 20, marginVertical: 10}}
            onPress={() => navigate('UpdateProfile')}
          />
          <Button
            title={'退出登录'}
            titleStyle={tailwind('text-sky-900')}
            buttonStyle={tailwind('bg-white border-gray-700 border-2')}
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
