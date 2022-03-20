import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import * as Progress from 'react-native-progress';

const Grade = progress => {
  const tailwind = useTailwind();
  return (
    <View
      style={tailwind(
        'max-w-sm mx-auto bg-white rounded-xl flex flex-row items-center p-4',
      )}>
      <Progress.Circle
        progress={progress.props / 100}
        size={70}
        thickness={12}
        showsText={true}
        formatText={progress => `${Math.round(progress * 100)}分`}
        borderWidth={0}
        color={'rgb(0, 150, 0)'}
        unfilledColor={'#DDDDDD'}
        strokeCap={'round'}
      />
      <View>
        <Text style={tailwind('text-red-400 font-semibold')}>
          You have a new message!
        </Text>
      </View>
    </View>
  );
};

export default Grade;
