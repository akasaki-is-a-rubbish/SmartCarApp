/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import Grade from './components/Grade';
import utilities from './tailwind.json';
import LinearGradient from 'react-native-linear-gradient';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      illegal: {userGrade: 70, untreated: 1, lastWeek: 4, thisWeek: 5},
    };
  }

  // tick() {
  //   this.setState(prevState => ({
  //     secondsElapsed: prevState.secondsElapsed + 0.01,
  //   }));
  // }

  // componentDidMount() {
  //   this.interval = setInterval(() => this.tick(), 0);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  
  render() {
    return (
      <TailwindProvider utilities={utilities}>
        <LinearGradient
          colors={['#FFFACD', '#F8F8FF']}
          style={styles.linearGradient}>
          <Grade {...this.state.illegal} />
        </LinearGradient>
      </TailwindProvider>
    );
  }
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
