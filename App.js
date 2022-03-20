/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import Grade from './components/Grade';
import utilities from './tailwind.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsElapsed: 70};
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
        <Grade props={this.state.secondsElapsed}/>
      </TailwindProvider>
    );
  }
}
