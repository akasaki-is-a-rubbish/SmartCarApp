import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTailwind} from 'tailwind-rn';

var sum = function (x, y) {
  return x + y;
};

const HEARTSTR =
  '心率是指正常人安静状态下每分钟心跳的次数，\
  也叫安静心率，一般为60～100次/分，可因年龄、性别或其他生理因素产生个体差异。\
  一般来说，年龄越小，心率越快，老年人心跳比年轻人慢，女性的心率比同龄男性快，\
  这些都是正常的生理现象。安静状态下，成人正常心率为60～100次/分钟，\
  理想心率应为55～70次/分钟（运动员的心率较普通成人偏慢，\
  一般为50次/分钟左右）。';

const DBheart = props => {
  const tailwind = useTailwind();
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#A52A2A',
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <Image
          style={{height: 36, width: 36}}
          source={require('../src/img/24gf-heartPulseW.png')}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            paddingTop: 10,
            color: '#FFFFFF',
          }}>
          本周心率健康情况
        </Text>
      </View>

      <View style={tailwind('flex flex-row justify-between')}>
        <View style={tailwind('flex flex-col mt-2')}>
          <Text style={tailwind('text-4xl text-white')}>越运动</Text>
          <Text style={tailwind('text-4xl text-white')}>越健康</Text>

          <Text style={tailwind('text-sm text-white mt-20')}>平均心率</Text>
          <Text style={tailwind('text-2xl text-white')}>
            {props.heart.reduce(sum) / props.heart.length}次/分
          </Text>

          <Text style={tailwind('text-sm text-white mt-10')}>最高心率</Text>
          <Text style={tailwind('text-2xl text-white')}>
            {Math.max.apply(null, props.heart)}次/分
          </Text>
        </View>
        <Image
          style={{height: 300, width: 250}}
          source={require('../src/img/fitness-lift-weights.png')}
        />
      </View>

      <Text
        style={tailwind(
          'mt-10 text-left text-white mb-20 text-tiny text-white text-opacity-60',
        )}>
        {HEARTSTR}
      </Text>
    </View>
  );
};

export default DBheart;
