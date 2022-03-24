import React, {Component} from 'react';
import Grade from './Grade';
import QRScan from './QRScan';
import Demo from './test';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  View,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MileageCard from './MileageCard';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      illegal: {userGrade: 60, untreated: 1, lastWeek: 4, thisWeek: 5},
    };
  }

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

  _Home = ({navigation}) => {
    return (
      <LinearGradient
        colors={['#FFFACD', '#F8F8FF']}
        style={styles.linearGradient}>
        <View style={styles.scan}>
          <Text style={{fontWeight: '900', fontSize: 25, color: 'black'}}>
            {this._getTimeState()}
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate('Scan');
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../src/img/scan.png')}
              />
            </TouchableNativeFeedback>
          </View>
        </View>
        <Grade {...this.state.illegal} />
        <View style={styles.card}>
          <MileageCard />
          <MileageCard />
        </View>
      </LinearGradient>
    );
  };
  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={this._Home}
          />
          <Stack.Screen name="Scan" component={QRScan} />
          <Stack.Screen name="Test" component={Demo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

var styles = StyleSheet.create({
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
  },
});
