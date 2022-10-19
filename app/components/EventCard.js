import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useTailwind } from 'tailwind-rn';
import { CachedImage } from '@georstat/react-native-image-cache';

const EventCard = props => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('w-full')}>
      <View
        style={tailwind(
          `mx-auto bg-white rounded-xl flex flex-col p-4 mt-4 border-l-8 ${handleDangerousLevel(
            props.dangerousLevel,
          )}`,
        )}>
        <View style={{ justifyContent: 'flex-start', marginBottom: 4 }}>
          <Text style={tailwind('text-2xl font-black text-black')}>警告 !</Text>
          <Text style={tailwind('text-sm text-gray-400 font-black')}>
            {handleDiscription(props.description)}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <CachedImage
            source={'https://tmonit.akasaki.space' + props.image}
            resizeMode={'stretch'}
            style={{ width: 300, height: 180, borderRadius: 10 }}
          />
          <Button
            title={'申诉反馈'}
            titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
            buttonStyle={{ backgroundColor: '#001f3f' }}
            containerStyle={{
              marginVertical: 10,
            }}
          />
          {props.dateTime && (
            <Text style={tailwind('text-sm text-black font-black text-right')}>
              {props.dateTime}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

function handleDiscription(data) {
  switch (data) {
    case 'ch1':
      return '禁止驾驶车辆时吸烟';
    case 'ch2':
      return '禁止驾驶车辆时喝水';
    case 'ch3':
      return '禁止驾驶车辆时使用手机';
    case 'ch4':
      return '危险！！！司机疲劳';
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
    default:
      return 'border-yellow-300';
  }
}

export default EventCard;
