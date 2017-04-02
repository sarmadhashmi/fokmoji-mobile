import React, { Component } from 'react';
import MainComponent from './MainComponent';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class EmojisAsAService extends Component {
  render() {
    return (
      <MainComponent />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('EmojisAsAService', () => EmojisAsAService);
