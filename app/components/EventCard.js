import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {useTailwind} from 'tailwind-rn';
import {getImage} from '../services/auth';
import Loading from './Loading';

export default EventCard = props => {
  const tailwind = useTailwind();
  const [img, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let img = await getImage(props.image);
        setImage(img);
        setIsLoading(false);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  }, []);

  return (
    <View style={tailwind('w-full')}>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={tailwind(
            `mx-auto bg-white rounded-xl flex flex-col p-4 mt-4 border-l-8 ${
              props.dangerousLevel
                ? handleDangerousLevel(props.dangerousLevel)
                : 'border-yellow-300'
            }`,
          )}>
          <View style={{justifyContent: 'flex-start', marginBottom: 4}}>
            <Text style={tailwind('text-2xl font-black text-black')}>
              警告 !
            </Text>
            <Text style={tailwind('text-sm text-gray-400 font-black')}>
              {handleDiscription(props.description)}
            </Text>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image
              source={{
                uri: img,
              }}
              style={{width: 300, height: 180, borderRadius: 10}}
              resizeMethod="resize"
            />
            <Button
              title={'申诉反馈'}
              titleStyle={{fontSize: 16, fontWeight: 'bold'}}
              buttonStyle={{backgroundColor: '#001f3f'}}
              containerStyle={{
                marginVertical: 10,
              }}
            />
            {props.dateTime == null ? null : (
              <Text
                style={tailwind('text-sm text-black font-black text-right')}>
                {props.dateTime}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

function handleDiscription(data) {
  switch (data) {
    case 'ch1':
      return '禁止驾驶车辆时使用手机';
    case 'ch2':
      return '禁止驾驶车辆时喝水';
    case 'ch3':
      return '禁止驾驶车辆时吸烟';
    case 'ch4':
      return '禁止驾驶车辆时手部离开方向盘';
    case 'ch5':
      return '禁止驾驶车辆时与乘客交谈';
  }
}

function handleDangerousLevel(level) {
  switch (level) {
    case 1:
      return 'border-yellow-300';
    case 2:
      return 'border-orange-400';
    case 3:
      return 'border-red-600';
    default:
      return 'border-red-600';
  }
}
