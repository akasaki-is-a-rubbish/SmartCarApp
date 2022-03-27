import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Router from './app/router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  tailwindExtensions = {
    'border-l-8': {
      style: {
        borderLeftWidth: 8,
      },
    },
    'text-sm': {
      style: {
        fontSize: 14,
        lineHeight: 20,
      },
    },
    'text-gray-600': {
      style: {
        color: 'rgb(75 85 99 / 1)',
      },
    },
    'text-gray-200': {
      style: {
        color: 'rgb(229 231 235 / 1)',
      },
    },
  };

  render() {
    return (
      <TailwindProvider utilities={{...utilities, ...this.tailwindExtensions}}>
        <Router />
      </TailwindProvider>
    );
  }
}
