import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const RadarCard = () => {
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        'mx-auto bg-white rounded-xl flex flex-col items-center p-5 mt-4',
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
