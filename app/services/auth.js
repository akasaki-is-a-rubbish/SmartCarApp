import axios from 'axios';
import * as c from '../constants';

// axios post register user
export async function register(data) {
  try {
    let res = await axios.post(c.REGISTER, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// axios post login user
export async function login(data) {
  try {
    let res = await axios.post(c.LOGIN, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// axios post forget password
export async function forgotPassword(data) {
  try {
    let res = await axios.post(c.FORGOT_PASSWORD, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// axios get current user
export async function currentUser() {
  try {
    let res = await axios.get(c.CURRENT_USER);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// axios get events by token
export async function getEvents() {
  try {
    let res = await axios.get(c.EVENTS);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// axios post vehicle pair
export async function vehiclePair(data) {
  try {
    let res = await axios.post(c.VEHICLEPAIR, `${data}`, {
      headers: {'Content-Type': 'application/json'},
    });

    return res.status;
  } catch (e) {
    throw handler(e);
  }
}

// axios post emergency contact
export async function setEmergencyContact(data) {
  try {
    data = JSON.stringify(data);
    let res = await axios.post(c.EMERGENCY_CONTACT, data, {
      headers: {'Content-Type': 'application/json'},
    });
    return res.status;
  } catch (e) {
    throw handler(e);
  }
}

export async function updateProfile(userId, data) {
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    const form_data = new FormData();
    for (let key in data) form_data.append(key, data[key]);

    let res = await axios.put(
      `${c.UPDATE_PROFILE}/${userId}`,
      form_data,
      options,
    );
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// handler error
export function handler(err) {
  let error = err;
  // console.log(error.response);
  if (err.response && err.response.data.hasOwnProperty('errors')) {
    // when register error the response.data has errors
    // and may the problem are many
    error = err.response.data.errors[0];
    console.log(error);
  } else if (err.response && err.response.data.hasOwnProperty('message')) {
    // when login error the response.data has message
    error = err.response.data.message;
  }
  return error;
}
