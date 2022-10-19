import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import * as api from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from 'react-native-basic-form';
import {ErrorText} from '../../components/Common';

export const EMERGENCY_CONTACTS = 'emergencyContacts';

export default function AddContact(props) {
  const {navigation} = props;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [{name: 'phone', label: '请填入电话', required: true}];

  async function onSubmit(state) {
    setLoading(true);

    try {
      await api.setEmergencyContact(state.phone);
      setLoading(false);
      Alert.alert(
        '添加成功',
        '您已成功添加一个紧急联系人',
        [{text: 'OK', onPress: () => navigation.navigate('Home')}],
        {cancelable: false},
      );
      await AsyncStorage.setItem(
        EMERGENCY_CONTACTS,
        JSON.stringify(state.phone),
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  let formProps = {title: 'Add a contact', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <ErrorText error={error} />
        <Form {...formProps} />
      </View>
    </View>
  );
}
