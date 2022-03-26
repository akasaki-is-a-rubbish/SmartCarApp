import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Router from './app/router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <TailwindProvider utilities={utilities}>
        <Router />
      </TailwindProvider>
    );
  }
}
