import React, {Component} from 'react';
import Grade from './Grade';
// import Scan from './Scan';
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

  _Scan = ({navigation}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
      </View>
    );
  };

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={this._Home} />
          <Stack.Screen name="Scan" component={this._Scan} />
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
    width: 100,
    height: 100,
  },
});
