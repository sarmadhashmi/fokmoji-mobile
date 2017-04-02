import React, { Component } from 'react';
import MainComponent from './MainComponent';
import ImageComponent from './ImageComponent';
import { Scene, Router } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class EmojisAsAService extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" navigationBarStyle={styles.navbar} titleStyle={styles.title} >
          <Scene key="main" component={MainComponent} title="FOKMOJI" />
          <Scene key="image" component={ImageComponent} title="Image" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent', 
    borderBottomWidth: 65
  },
  title: {
    color: 'transparent',
  }
});

AppRegistry.registerComponent('EmojisAsAService', () => EmojisAsAService);
