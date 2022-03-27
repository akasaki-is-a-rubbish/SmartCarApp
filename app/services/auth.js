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
  console.log(error.response);
  if (err.response && err.response.data.hasOwnProperty('errors')) {
    error = err.response.data.errors[0];
  } else if (!err.hasOwnProperty('errors')) {
    error = err.toJSON();
  }

  //may backend has many error
  return new Error(error);
}
