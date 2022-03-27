import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';

export default EventCard = props => {
  const tailwind = useTailwind();
  let {image} = props;
  if (image == null) {
    image = 'https://s3.bmp.ovh/imgs/2022/03/5a04d1112befffb5.jpg';
  }
  return (
    <View
      style={tailwind(
        `mx-auto bg-white rounded-xl flex flex-col p-4 mt-4 border-l-8 ${
          props.dangerousLevel
            ? handleDangerousLevel(props.dangerousLevel)
            : 'border-yellow-300'
        }`,
      )}>
      <View style={{justifyContent: 'flex-start', marginBottom: 4}}>
        <Text style={tailwind('text-2xl font-black text-black')}>警告 !</Text>
        <Text style={tailwind('text-sm text-gray-400 font-black')}>
          {handleDiscription(props.description)}
        </Text>
      </View>
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <Image
          source={{uri: image}}
          style={{width: 300, height: 180, borderRadius: 10}}
        />
        <Button
          title={'申诉反馈'}
          titleStyle={{fontSize: 16, fontWeight: 'bold'}}
          buttonStyle={{backgroundColor: '#001f3f'}}
          containerStyle={{
            marginVertical: 10,
          }}
        />
        {props.dateTime == null ? null : (
          <Text style={tailwind('text-sm text-black font-black text-right')}>
            {props.dateTime}
          </Text>
        )}
      </View>
    </View>
  );
};

function handleDiscription(data) {
  switch (data) {
    case 'ch1':
      return '禁止驾驶车辆时使用手机';
    case 'ch2':
      return '禁止驾驶车辆时喝水';
    case 'ch3':
      return '禁止驾驶车辆时吸烟';
    case 'ch4':
      return '禁止驾驶车辆时手部离开方向盘';
    case 'ch5':
      return '禁止驾驶车辆时与乘客交谈';
  }
}

function handleDangerousLevel(level) {
  switch (level) {
    case 1:
      return 'border-yellow-300';
    case 2:
      return 'border-orange-400';
    case 3:
      return 'border-red-600';
  }
}
