import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Router from './app/router';
import AuthProvider from './app/provider';

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
    'w-42': {
      style: {
        width: 168,
      },
    },
    'text-tiny': {
      style: {
        fontSize: 10,
      },
    },
    'grid-cols-2': {
      style: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
    'translate-xy-lts': {
      style: {
        transform: [{translateX: 100}],
      },
    },
  };

  render() {
    return (
      <TailwindProvider utilities={{...utilities, ...this.tailwindExtensions}}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </TailwindProvider>
    );
  }
}
