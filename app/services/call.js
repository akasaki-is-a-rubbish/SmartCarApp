import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import * as c from '../constants';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

// use mqtt to send message
export async function call(longitude, latitude) {
  let contacts = await AsyncStorage.getItem('emergencyContacts');
  let jsonstr = {
    contacts: JSON.parse(contacts),
    longitude: longitude,
    latitude: latitude,
  };

  const client = new Paho.MQTT.Client(
    c.MQTTSERVER,
    c.MQTTPORT,
    '/mqtt',
    c.CLIENT + '_' + Math.random().toString(16).substring(2, 8),
  );

  function onConnect() {
    console.log('connected');
    client.subscribe('/call');
    message = new Paho.MQTT.Message(JSON.stringify(jsonstr));
    message.destinationName = '/call';
    client.send(message);
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log('消息：' + message.payloadString);
  }

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  try {
    client.connect({
      useSSL: false,
      onSuccess: onConnect,
      onFailure: e => {
        console.log('失败');
        console.log(e);
        return false;
      },
    });
  } catch (e) {
    throw console.log(e);
  }
}
