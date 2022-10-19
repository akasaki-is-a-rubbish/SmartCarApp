/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import * as api from '../../services/auth';

import Form from 'react-native-basic-form';
import JumpText from '../../components/JumpText';
import {Header, ErrorText} from '../../components/Common';

export default function Register(props) {
  const {navigation} = props;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    {name: 'username', label: 'User Name', required: true},
    {name: 'email', label: 'Email Address', required: true},
    {name: 'password', label: 'Password', required: true, secure: true},
  ];

  async function onSubmit(state) {
    setLoading(true);

    try {
      let response = await api.register(state);
      setLoading(false);
      Alert.alert(
        'Registration Successful',
        response.message,
        [{text: 'OK', onPress: () => navigation.replace('Login')}],
        {cancelable: false},
      );
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  let formProps = {title: 'Register', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <Header title={'Register'} />
      <View style={{flex: 1}}>
        <ErrorText error={error} />
        <Form {...formProps}>
          <JumpText
            title={'Already have an account?'}
            jpText={'Login'}
            onPress={() => navigation.replace('Login')}
            style={{marginTop: 50}}
          />
        </Form>
      </View>
    </View>
  );
}
