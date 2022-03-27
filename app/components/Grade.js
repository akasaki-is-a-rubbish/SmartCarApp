import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import * as Progress from 'react-native-progress';

const Grade = props => {
  const tailwind = useTailwind();
  const {userGrade, untreated, lastWeek, thisWeek, navigation} = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Events')}>
      <View
        style={tailwind(
          'mx-auto w-full bg-white rounded-xl flex flex-row items-center p-4 ',
        )}>
        <Progress.Circle
          progress={userGrade / 100}
          size={94}
          thickness={16}
          showsText={true}
          formatText={progress => `${Math.round(progress * 100)}分`}
          borderWidth={0}
          color={'rgb(0, 150, 0)'}
          unfilledColor={'#DDDDDD'}
          strokeCap={'round'}
        />
        <View style={tailwind('flex flex-col')}>
          <View style={tailwind('flex flex-row ml-3')}>
            <Text style={tailwind('text-red-400 font-black mr-2 text-3xl')}>
              {untreated}
            </Text>
            <Text style={tailwind('font-black text-3xl')}>项事件待处理</Text>
          </View>
          <View style={tailwind('ml-4 flex flex-row')}>
            <Image
              source={require('../src/img/up.png')}
              resizeMethod={'resize'}
              style={tailwind('w-5 h-5')}
            />
            <Text style={tailwind('text-red-500 font-black text-xs mt-1 ml-1')}>
              {((thisWeek - lastWeek) / lastWeek) * 100}%
            </Text>
            <Text
              style={tailwind('text-gray-400 ml-1 font-bold font-semibold')}>
              since last week
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Grade.prototype = {
  userGrade: Number,
  untreated: Number,
};

Grade.defaultProps = {
  userGrade: 70,
  untreated: 1,
};

export default Grade;
