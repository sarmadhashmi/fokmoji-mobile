import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActionSheetIOS,
  TouchableHighlight,
  View,
  Image,
  CameraRoll
} from 'react-native';

export default class ImageComponent extends Component {
  showActions = () => {
    ActionSheetIOS.showShareActionSheetWithOptions({ url: this.props.imageUri },  (error) => {}, (completed, method) => {});
  }

  render() {
    const { imageUri } = this.props;
    return (
      <TouchableHighlight onPress={this.showActions} style={{flex: 1}}>
        <Image source={{uri: imageUri}} style={styles.image} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
});

AppRegistry.registerComponent('ImageComponent', () => ImageComponent);
