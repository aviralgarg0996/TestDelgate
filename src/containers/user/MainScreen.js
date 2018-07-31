/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Background from '../../components/common/Background';
import Constants from "../../constants";

export default class MainScreen extends Component<{}> {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Background style={styles.container}>
        <Image source={Constants.Images.user.logo} style={styles.logo} resizeMode={'contain'} />
        <TouchableOpacity onPress={()=>navigate('Home')} style={styles.imgContainer}>
          <Image source={Constants.Images.user.ven} style={styles.driver} resizeMode={'contain'} />
        </TouchableOpacity>
        <Text style={styles.text}>Open Driver App</Text>
        <TouchableOpacity onPress={()=>navigate('CustomerHome')} style={styles.imgContainer}>
          <Image source={Constants.Images.user.cart} style={styles.customer} resizeMode={'contain'} />
        </TouchableOpacity>
        <Text style={styles.text}>Open Customer App</Text>
      </Background>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  logo: {
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 30,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 60
  },
  driver:{
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 15,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 25,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*3,
    alignSelf:'center'
  },
  customer:{
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 15,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 25,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*3,
    alignSelf:'center'
  },
  text:{
    fontSize:24,
    fontWeight:'700',
    backgroundColor:'transparent',
    color:'#16477C'
  },
  imgContainer:{
    alignItems:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*3,
    borderWidth:4,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100*22,
    width: Constants.BaseStyle.DEVICE_HEIGHT/100 * 22,
    borderRadius:Constants.BaseStyle.DEVICE_HEIGHT/100 * 11,
    borderColor:'#16477C',
    //padding:10,
  }
});
