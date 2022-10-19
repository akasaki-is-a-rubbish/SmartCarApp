/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View} from 'react-native';

import * as api from '../../services/auth';
import {useAuth} from '../../provider';

import Form from 'react-native-basic-form';
import JumpText from '../../components/JumpText';
import {Header, ErrorText} from '../../components/Common';

export default function Login(props) {
  const {navigation} = props;
  const {reset} = navigation;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {handleLogin} = useAuth();

  const fields = [
    {name: 'email', label: 'Email', required: true},
    {name: 'password', label: 'Password', required: true, secure: true},
  ];

  async function onSubmit(state) {
    setLoading(true);
    try {
      // response = {success, token}
      let response = await api.login(state);
      await handleLogin({response, state});
      setLoading(false);

      reset({
        index: 0,
        routes: [{name: 'App'}],
      });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  let formProps = {title: 'Login', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <Header title={'Login'} />
      <View style={{flex: 1}}>
        <ErrorText error={error} />
        <Form {...formProps}>
          <JumpText
            jpText={'Forgot Password?'}
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{marginTop: 20}}
          />
          <JumpText
            title={"Don't have an account?"}
            jpText={'Register'}
            onPress={() => navigation.replace('Register')}
            style={{marginTop: 50}}
          />
        </Form>
      </View>
    </View>
  );
}
