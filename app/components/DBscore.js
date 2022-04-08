import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const DBscore = props => {
  const tailwind = useTailwind();
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: _handlerColor(props.score),
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 36, width: 36}}
            source={require('../src/img/car_logo.png')}
          />
          <Text
            style={{
              fontSize: 20,
              padding: 10,
              fontWeight: '800',
              color: '#FFFFFF',
            }}>
            SmartCar
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontWeight: '800', color: '#FFFFFF'}}>
            {props.dateTime}
          </Text>
          <Text style={{fontWeight: '800', color: '#FFFFFF'}}>
            {props.user}的行车驾驶周报
          </Text>
        </View>
      </View>
      <View>
        <Image
          style={tailwind('h-52 w-52 m-auto p-10 rounded-full mt-12')}
          source={require('../src/img/celebration.png')}
        />
      </View>
      <Text style={tailwind('text-4xl text-white text-center')}>
        {props.score}分
      </Text>
      <Text style={tailwind('mt-1 text-sm text-white text-center mb-20')}>
        本周检测分心 4 次
      </Text>
    </View>
  );
};

function _handlerColor(data) {
  if (data >= 80) {
    return '#43CD80';
  } else if (data >= 60) {
    return '#FFD700';
  } else {
    return '#FF0000';
  }
}

export default DBscore;
