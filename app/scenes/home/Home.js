/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {PanResponder} from 'react-native';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Grade from '../../components/Grade';
import MileageCard from '../../components/MileageCard';
import HartRateCard from '../../components/HartRateCard';
import Radar from '../../components/RadarCard';
import EmergencyCard from '../../components/EmergencyCard';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  scan: {
    marginTop: '5%',
    marginBottom: '8%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  car: {
    height: 120,
    width: 330,
    alignSelf: 'center',
  },
});
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.checkPermission();
    this.navigation = props.navigation;
    this.state = {
      illegal: {userGrade: 75, untreated: 1, lastWeek: 4, thisWeek: 5},
      date: {today: null},
    };
  }

  async checkPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      if (
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('ACCESS_COARSE_LOCATION granted');
      } else {
        this.requestLocationPermission();
      }
      if (
        granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('CAMERA granted');
      } else {
        this.requestCameraPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  requestLocationPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location',
        buttonNext: 'ok',
      },
    )
      .then(granted => {
        if (granted) {
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
        }
      })
      .catch(err => {
        console.warn(err);
      })
      .done();
  }

  requestCameraPermission() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Camera Permission',
      message: 'This app needs access to your camera',
      buttonNext: 'ok',
    })
      .then(granted => {
        if (granted) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      })
      .catch(err => {
        console.warn(err);
      })
      .done();
  }

  componentDidMount() {
    let timeNow = new Date();
    const month = (timeNow.getMonth() + 1).toString();
    const day = timeNow.getDate().toString();
    this.setState({
      date: {
        today: month + '月' + day + '日',
      },
    });
  }

  // 滑动跳转周报
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => {
      return gestureState.dx < -100;
    },
    onPanResponderGrant: (e, gestureState) => {
      if (gestureState.x0 > 0) {
        this.navigation.navigate('WeekReport');
      }
    },
  });

  _getTimeState = () => {
    let timeNow = new Date();
    let hours = timeNow.getHours();
    let text = '';
    if (hours >= 0 && hours <= 10) {
      text = '早上好,';
    } else if (hours > 10 && hours <= 14) {
      text = '中午好,';
    } else if (hours > 14 && hours <= 18) {
      text = '下午好,';
    } else if (hours > 18 && hours <= 24) {
      text = '晚上好,';
    }

    return text;
  };

  render() {
    return (
      <LinearGradient
        colors={['#FFFACD', '#F8F8FF']}
        style={styles.linearGradient}
        {...this.panResponder.panHandlers}>
        <ScrollView>
          <View style={styles.scan}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.navigation.navigate('User')}>
                <Image
                  style={{
                    borderRadius: 50,
                    height: 50,
                    width: 50,
                    marginRight: 10,
                  }}
                  source={require('../../src/img/user.jpg')}
                />
              </TouchableOpacity>
              <Text style={{fontWeight: '900', fontSize: 25, color: 'black'}}>
                {this._getTimeState()}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => this.navigation.navigate('QRScan')}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../src/img/scan.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Image
            style={styles.car}
            source={require('../../src/img/left.png')}
          />
          <Grade {...this.state.illegal} navigation={this.navigation} />
          <View style={styles.card}>
            <MileageCard date={this.state.date} navigation={this.navigation} />
            <HartRateCard date={this.state.date} navigation={this.navigation} />
          </View>
          <View style={styles.card}>
            <Radar navigation={this.navigation} />
            <EmergencyCard navigation={this.navigation} />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
