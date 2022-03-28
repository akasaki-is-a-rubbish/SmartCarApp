import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import Grade from '../../components/Grade';
import MileageCard from '../../components/MileageCard';
import HartRateCard from '../../components/HartRateCard';
import Radar from '../../components/RadarCard';
import EmergencyCard from '../../components/EmergencyCard';
import LinearGradient from 'react-native-linear-gradient';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      illegal: {userGrade: 60, untreated: 1, lastWeek: 4, thisWeek: 5},
      imageURL: '',
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

  render() {
    return (
      <LinearGradient
        colors={['#FFFACD', '#F8F8FF']}
        style={styles.linearGradient}>
        <View style={styles.scan}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this.navigation.navigate('User')}>
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
        <Grade {...this.state.illegal} navigation={this.navigation} />
        <View style={styles.card}>
          <MileageCard />
          <HartRateCard />
        </View>
        <View style={styles.card}>
          <Radar />
          <EmergencyCard navigation={this.navigation} />
        </View>
      </LinearGradient>
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
    justifyContent: 'space-between',
  },
});
