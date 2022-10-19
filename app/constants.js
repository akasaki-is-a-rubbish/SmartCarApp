//API URL
export const warningSound = require('./src/warning.mp3');

export const radarAngleInfo = [160, 140, 120, 90, 60, 40, 20];

export const API_URL = 'https://tmonit.akasaki.space/api';

//API End Points
export const REGISTER = `${API_URL}/user/register`;
export const LOGIN = `${API_URL}/user/login`;
export const CURRENT_USER = `${API_URL}/user/currentUser`;
export const EVENTS = `${API_URL}/events`;
export const EMERGENCY_CONTACTS = `${API_URL}/emergencyContacts`;
export const VEHICLEPAIR = `${API_URL}/vehicles/pair`;
export const EMERGENCY_CONTACT = `${API_URL}/user/setEmergencyContract`;

export const MQTTSERVER = '119.91.198.5';
export const MQTTPORT = 8083;
export const CLIENT = 'APP_CLIENT';
