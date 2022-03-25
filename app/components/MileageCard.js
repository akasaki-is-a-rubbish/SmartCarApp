import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const MileageCard = props => {
  const tailwind = useTailwind();
  const value = 40;
  const data = '6月7日';
  return (
    <TouchableOpacity>
      <View
        style={tailwind(
          'mx-auto bg-white rounded-xl flex flex-col items-center p-4 mt-4',
        )}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../src/img/mileage.png')}
            style={{width: 40, height: 40}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: '700', fontSize: 18, color: 'black'}}>
              {value}KM
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
    </TouchableOpacity>
  );
};

export default MileageCard;
