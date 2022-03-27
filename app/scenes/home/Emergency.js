import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {Avatar, Button} from 'react-native-elements';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Emergency = () => {
  const tailwindcss = useTailwind();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let contacts = await AsyncStorage.getItem('emergencyContacts');
        if (contacts != null && contacts != '' && contacts != undefined) {
          contacts = JSON.parse(contacts);
          setContact(contacts);
        }
        setIsLoading(false);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: 20, flexDirection: 'column'}}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Text style={tailwindcss('font-black text-xl mb-2')}>联系人</Text>
          <View
            style={tailwindcss(
              'mx-auto w-full bg-white rounded-xl p-5 flex flex-row justify-between items-center',
            )}>
            <View
              style={tailwindcss('justify-start flex flex-row items-center')}>
              <Avatar
                source={require('../../src/img/user.jpg')}
                rounded
                size={50}
              />
              <View style={tailwindcss('ml-5')}>
                <Text style={tailwindcss('font-bold text-xl text-black')}>
                  张三
                </Text>
                <Text style={tailwindcss('text-sm')}>{contact}</Text>
              </View>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Button
                icon={{
                  name: 'chat-bubble',
                  type: 'ionic',
                  color: '#ffffff',
                }}
                containerStyle={{alignItems: 'flex-end'}}
                buttonStyle={{
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  backgroundColor: '#B22222',
                }}></Button>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Emergency;
