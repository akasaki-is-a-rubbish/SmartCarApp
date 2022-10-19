/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {PanResponder, ScrollView} from 'react-native';
import WeeklyScore from '../../components/WeeklyScore';
import WeeklyHeart from '../../components/WeeklyHeart';

export default class WeekReport extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      user: 1234,
      score: 90,
      heart: [70, 80, 80, 67, 89, 70, 90],
      dateTime: '03/28-04/03',
    };
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => {
      if (gestureState.dx > 20) {
        return true;
      }
      return false;
    },
    onPanResponderGrant: (e, gestureState) => {
      if (gestureState.x0 > 0) {
        this.navigation.navigate('Home');
      }
    },
  });

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}
        {...this.panResponder.panHandlers}>
        <WeeklyScore
          score={this.state.score}
          user={this.state.user}
          dateTime={this.state.dateTime}
        />
        <WeeklyHeart heart={this.state.heart} />
      </ScrollView>
    );
  }
}
