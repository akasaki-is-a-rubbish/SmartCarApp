import React, {useMemo, useReducer, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as api from './services/auth';
//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, {initialState, LOGGED_IN, LOGGED_OUT} from './reducer';

// CONFIG KEYS [Storage Keys]
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const EMERGENCY_CONTACTS = 'emergencyContacts';
export const keys = [TOKEN_KEY, USER_KEY, EMERGENCY_CONTACTS];

// CONTEXT
const AuthContext = React.createContext();

export default function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState || {});

  // Get Auth state
  const getAuthState = async () => {
    try {
      //GET TOKEN && USER
      let token = await AsyncStorage.getItem(TOKEN_KEY);
      let user = await AsyncStorage.getItem(USER_KEY);
      user = JSON.parse(user);

      //auth token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      // auth token
      // response = {id, username, email, avatar, emergencycontract}
      let response = await api.currentUser(token);
      if (response.email == user) {
        dispatch({type: LOGGED_IN, user: user});
        await AsyncStorage.setItem(
          EMERGENCY_CONTACTS,
          JSON.stringify(response.emergencycontract),
        );
        return true;
      }
      return false;
    } catch (error) {
      await handleLogout();
    }
  };

  // Handle Login
  const handleLogin = async data => {
    try {
      //store token and user
      let {response, state} = data;
      //response = {token, ...}
      //state = {email, password, username}
      let token = response.token;
      let user = state.email;
      let data_ = [
        [USER_KEY, JSON.stringify(user)],
        [TOKEN_KEY, token],
      ];
      await AsyncStorage.multiSet(data_);

      //add token to axios header
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      //dispatch action
      dispatch({type: LOGGED_IN, user: user});
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      //remove token and user
      await AsyncStorage.multiRemove(keys);

      //remove token from axios header
      delete axios.defaults.headers.common.Authorization;

      //dispatch action
      dispatch({type: LOGGED_OUT});
    } catch (error) {
      throw new Error(error);
    }
  };

  //update user locl storage data and dispatch to reducer
  const updateUser = async user => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch({type: LOGGED_IN, user}); //DISPATCH TO REDUCER
    } catch (error) {
      throw new Error(error);
    }
  };

  //useMemo to return the value of the state
  const value = useMemo(() => {
    return {state, getAuthState, handleLogin, handleLogout, updateUser};
  }, [state]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
const useAuth = () => {
  return useContext(AuthContext);
};
export {useAuth, AuthContext};
