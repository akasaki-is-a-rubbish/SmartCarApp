import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Router from './app/router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
        <Router />
      </TailwindProvider>
    );
  }
}
