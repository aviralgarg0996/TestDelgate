import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, View, ImageBackground } from 'react-native';
//import AppIntroSlider from 'react-native-app-intro-slider';
import Constants from '../../../constants'



export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        setTimeout(() => {

          this.props.navigation.navigate("Login");//("AppIntroduction");//
        }, 2000);
      }

  render() {
    return (

    <ImageBackground
        style={{
          flex: 1,
          alignItems:'center',
       justifyContent:'center'
        }}
        source= {require('../../../assets/images/background.png')}
>
      <Image

    resizeMode="center"
      source= {require('../../../assets/images/appName.png')}
    />
    </ImageBackground>
    );
  }
}
