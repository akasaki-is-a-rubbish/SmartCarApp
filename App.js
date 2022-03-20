/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import Hello from './components/Hello';
import utilities from './tailwind.json';

export default class App extends React.Component {
  render() {
    return (
      <TailwindProvider utilities={utilities}>
        <Hello />
      </TailwindProvider>
    );
  }
}
