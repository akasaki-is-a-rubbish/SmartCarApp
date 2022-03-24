import React, {Component} from 'react';
import Grade from './Grade';
import ScanScreen from './ScanScreen';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      illegal: {userGrade: 60, untreated: 1, lastWeek: 4, thisWeek: 5},
    };
  }

  _Home = ({navigation}) => {
    return (
      <LinearGradient
        colors={['#FFFACD', '#F8F8FF']}
        style={styles.linearGradient}>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Scan');
          }}>
          <Image style={styles.image} source={require('../src/img/scan.png')} />
        </TouchableNativeFeedback>
        <Grade {...this.state.illegal} />
      </LinearGradient>
    );
  };

  onSuccess = e => {
    console.log(e);
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  ScanScreen = ({navigation}) => {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        showMarker={true}
        cameraStyle={styles.cameraContainer}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        cameraContainerStyle={styles.zeroContainer}
      />
    );
  };

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={this._Home} />
          <Stack.Screen name="Scan" component={this.ScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  cameraContainer: {
    height: '20%',
  },
  zeroContainer: {
    height: '25%',
    flex: 1,
    padding: 20,
  },
});
