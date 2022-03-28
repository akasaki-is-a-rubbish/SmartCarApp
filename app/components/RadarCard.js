import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const RadarCard = () => {
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        'w-42 bg-white rounded-xl flex flex-col items-center p-4 mt-4',
      )}>
      <Image
        style={{width: 100, height: 100}}
        source={require('../src/img/Radar.png')}
      />
      <Text style={tailwind('font-black text-2xl mt-4')}>车载雷达</Text>
    </View>
  );
};

export default RadarCard;
