import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

import PulseLoader from 'react-native-pulse-loader';
import { Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import ImageComponent from './ImageComponent';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob'

var options = {
  title: 'Select a picture',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class MainComponent extends Component {
  constructor() {
    super();
    this.state = { isLoading: false, isDone: false};
  }

  componentWillMount() {
    this._animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation() {
    this._animatedValue.setValue(0);
    Animated.timing(this._animatedValue, {
      toValue: 1,
      duration: 3000
    }).start(() => this.runAnimation());
  }

  onButtonPress = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log("HERE=", response);
        this.setState({ isLoading: true, isDone: false });

        let fd = new FormData();
        fd.append("file", response.uri);
        fd.append("uploads[filename]", 'picture')
        fd.append("uploads[file]", {uri: response.uri, name: 'image.jpg', type: 'multipart/form-data'})

        let self = this;

        axios.post('https://emojis-as-a-service.herokuapp.com/upload', fd)
          .then(function(axiosResponse) {
            RNFetchBlob
              .config({
                fileCache : true,
                appendExt : 'jpg'
              })
              .fetch('GET', axiosResponse.data.url)
              .then((res) => {
                self.setState({ isLoading: false, isDone: true});
                Actions.image({imageUri: res.path()});
                console.log('The file saved to ', res.path())
              })
          }).catch(function(err) {
            self.setState({ isLoading: false, isDone: false});
            console.log("error=", err);
          });
      }
    });
  };

  renderNotDone() {
    var interpolatedRotateAnimation = this._animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      !this.state.isLoading ?
      <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
        <Image source={require('./logo.png')} />
      </TouchableOpacity>
      :
      <View style={styles.button}>
        <Animated.Image
          style={{transform: [{rotate: interpolatedRotateAnimation}]}}
          source={require('./logo.png')} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./background.png')} style={styles.backgroundImage}>
          <Text style={styles.title}>FOKMOJI</Text>
          <Text style={styles.subtitle}>Turn faces into emojis</Text>
          { this.renderNotDone() }
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#AFEEEE',
  },
  box: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 100,
    left: 100,
    width: 100,
    height: 100
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
    fontFamily: 'Lato',
    color: 'black'
  },
  subtitle: {
    alignSelf: 'stretch',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    backgroundColor: 'transparent',
    fontFamily: 'Lato',
    color: 'white'
  },
  button: {
    alignSelf: 'center',
    marginTop: 100,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  }
});

AppRegistry.registerComponent('MainComponent', () => MainComponent);
