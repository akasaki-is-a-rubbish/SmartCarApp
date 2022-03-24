import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const MileageCard = () => {
  const tailwind = useTailwind();
  const value = 40;
  const data = '6月7日';
  return (
    <View
      style={tailwind(
        'mx-auto bg-white rounded-xl flex flex-row items-center p-4 mt-4',
      )}>
      <Image
        source={require('../src/img/mileage.png')}
        style={{width: 40, height: 40}}
      />
      <View style={{flexDirection: 'column'}}>
        <Text style={{fontWeight: '700', fontSize: 18, color: 'black'}}>
          里程{value}KM
        </Text>
        <Text style={{fontWeight: '700', fontSize: 15, color: '#DCDCDC'}}>
          {data}
        </Text>
      </View>
    </View>
  );
};

export default MileageCard;
