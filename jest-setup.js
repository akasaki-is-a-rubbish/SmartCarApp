jest.mock(
  'react-native-qrcode-scanner/node_modules/react-native-permissions',
  () => require('react-native-permissions/mock'),
);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
