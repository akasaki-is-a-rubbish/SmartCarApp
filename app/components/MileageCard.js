/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const MileageCard = props => {
  const tailwind = useTailwind();
  const value = 1247;
  const data = props.date.today;
  const {navigation} = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Mileage')}>
      <View style={tailwind('w-42 bg-white rounded-xl flex flex-col p-4 mt-4')}>
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
