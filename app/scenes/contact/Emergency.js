import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, PermissionsAndroid} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Avatar, Button} from 'react-native-elements';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {call} from '../../services/call';

import Geolocation from '@react-native-community/geolocation';

const Emergency = props => {
  const tailwindcss = useTailwind();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let contacts = await AsyncStorage.getItem('emergencyContacts');
        if (contacts != 'null' && contacts != '' && contacts != undefined) {
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

  const callEmergency = async () => {
    try {
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          position => {
            call(position.coords.longitude, position.coords.latitude);
          },
          error => console.log('location error: ', JSON.stringify(error)),
          // High accuracy is not available
          {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
        );
      }
    } catch (e) {}
  };

  const hasLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
            <View style={tailwindcss('flex flex-row items-center')}>
              <Avatar
                source={require('../../src/img/user.jpg')}
                rounded
                size={50}
              />
              <Text style={tailwindcss('ml-5 text-xl font-black')}>
                {contact}
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Button
                icon={{
                  name: 'chat-bubble',
                  type: 'ionic',
                  color: '#ffffff',
                }}
                onPress={() => props.navigation.navigate('AddContact')}
                containerStyle={{alignItems: 'flex-end'}}
                buttonStyle={{
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  backgroundColor: '#B22222',
                }}></Button>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={callEmergency}
              icon={{
                name: 'info',
                type: 'ionic',
                color: '#ffffff',
                size: 40,
              }}
              buttonStyle={{
                height: 100,
                width: 100,
                borderRadius: 10,
                backgroundColor: '#B22222',
                marginTop: 40,
              }}
              iconPosition="top"
              title="紧急事件"></Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Emergency;
