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
  TextInput,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import Constants from "../../constants";
import {BoxShadow, BorderShadow} from 'react-native-shadow';

class Orders_PendingServices extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      //generalList : [{id:0,img:Constants.Images.customer.furniture,orderid:'9786',delDate:'05/02/2018',timeframe:'12:00 PM - 4:00 PM'}],

    }
  }
  render() {

    return (
      <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH,
                          height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18.2,
                          color:"#000",
                          border:3,
                          radius:5,
                          opacity:0.1,
                          x:0,
                          y:2,
                          style:{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,marginVertical:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}}}>

          <View style={[styles.container,{alignItems:'center',backgroundColor:'#ffffff'/*,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18*/}]}>
            <View style={[styles.flexRow,{alignItems:'center',marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
              <View style={[styles.flexRow,{flex:1,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                <Image source={Constants.Images.customer.white_glove} style={[styles.imgSize,]} resizeMode={'contain'}/>
                <Text style={[styles.HeaderTextStyle,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}]}>{'White Glove'}</Text>
              </View>
              <View style={[styles.flexRow,{flex:1,marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                <Image source={Constants.Images.customer.extra_helper} style={[styles.imgSize,]} resizeMode={'contain'}/>
                <Text style={[styles.HeaderTextStyle,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}]}>{'Extra Helper'}</Text>
              </View>
            </View>
            <View style={[styles.flexRow,{marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
              <View style={[styles.flexRow,{flex:1,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                <Image source={Constants.Images.customer.residential} style={[styles.imgSize,]} resizeMode={'contain'}/>
                <Text style={[styles.HeaderTextStyle,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}]}>{'Residential'}</Text>
              </View>
              <View style={[styles.flexRow,{flex:1,marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                <Image source={Constants.Images.customer.tailgate} style={[styles.imgSize,]} resizeMode={'contain'}/>
                <Text style={[styles.HeaderTextStyle,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}]}>{'Tailgate'}</Text>
              </View>
            </View>
          </View>


      </BoxShadow>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexRow:{
		flexDirection: 'row',
	},
  imgSize:{
		width:Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
		height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
	},
  HeaderTextStyle:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:'#081933',
  },
  infoimgSize:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
  },
});
export default connect(state => ({state: state.CustomerReducer}))(Orders_PendingServices);
