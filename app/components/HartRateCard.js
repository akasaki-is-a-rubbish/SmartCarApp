import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const HartRateCard = () => {
  const tailwind = useTailwind();
  const value = 40;
  const data = '6月7日';
  return (
    <View
      style={tailwind(
        'w-42 bg-white rounded-xl flex flex-col items-center p-4 mt-4',
      )}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Image
          source={require('../src/img/24gf-heartPulse.png')}
          style={{width: 40, height: 40}}
        />
        <View style={{flexDirection: 'column', marginLeft: 8}}>
          <Text style={{fontWeight: '700', fontSize: 18, color: 'black'}}>
            {value}BPM
          </Text>
          <Text style={{fontWeight: '700', fontSize: 13, color: '#DCDCDC'}}>
            {data}
          </Text>
        </View>
      </View>
      <Image
        source={require('../src/img/mi.png')}
        style={{height: 120, width: 130}}
      />
    </View>
  );
};

export default HartRateCard;
