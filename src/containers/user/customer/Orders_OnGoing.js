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
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListView,
  ImageBackground,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';

import HeaderBackgroundWithBackButton from '../../../components/customer/HeaderBackgroundWithBackButton';
import Constants from "../../../constants";
import SelectDriverMapView from '../../../components/customer/SelectDriverMapView';
import Home_SelectDriverList from '../../../components/customer/Home_SelectDriverList';
import ShadowButton from "../../../components/customer/ShadowButton";

import { ToastActionsCreators } from 'react-native-redux-toast';
import {BoxShadow} from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';

var strAddress='228 Park Ave S, New York, NY 10003, USA';


class Orders_OnGoing extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      generalFlag:1,
      locationFlag:0,
      servicesFlag:0,
      productFlag:0,
      generalList : [{id:0,img:Constants.Images.customer.furniture,amount:'$800',
        orderid:'9786',delDate:'05/02/2018',timeframe:'12:00 PM - 4:00 PM'}],
    }

  }

  render() {
    const shadowOpt = {
        width:Constants.BaseStyle.DEVICE_WIDTH,
        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7.6,
        color:"#000",
        border:3,
        radius:1,
        opacity:0.1,
        x:0,
        y:2,
        style:{zIndex:1}
    };
    //debugger;
    const { navigate, goBack } = this.props.navigation;

    var _generalList=this.state.generalList.map((val,b) => {
      return(
        <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH,
                            height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 15,
                            color:"#000",
                            border:3,
                            radius:5,
                            opacity:0.1,
                            x:0,
                            y:2,
                            style:{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}}}>
        <View style={[styles.container,{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 15}]}>
          <View style={[styles.flexRow]}>
          <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
            <Image source={val.img} style={[styles.imgSize,]} resizeMode={'contain'}/>
          </View>
          <View style={{flex:0.5,alignItems:'flex-start',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
            <Text style={[styles.orangeTextStyle]}>{val.amount}</Text>
            <Text style={[styles.orderTextStyle]}>{'Order Id : '}{val.orderid}</Text>
          </View>
          </View>
          <View style={[styles.flexRow,{marginVertical:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}>
            <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
              <Text style={[styles.orderTextStyle]}>{'Delivery Date'}</Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-start',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
              <Text style={[styles.orderTextStyle]}>{val.delDate}</Text>
            </View>
          </View>
          <View style={[styles.flexRow]}>
            <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
              <Text style={[styles.orderTextStyle]}>{'Time Window'}</Text>
            </View>
            <View style={{flex:0.7,alignItems:'flex-end',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
              <Text style={[styles.orderTextStyle]}>{val.timeframe}</Text>
            </View>
          </View>
        </View>
        </BoxShadow>
      );
    });

    return (
      <View style={[styles.container,{backgroundColor:Constants.Colors.White}]}>
        <HeaderBackgroundWithBackButton navigation={navigate} goBack={goBack} headerText={'Ongoing Order'}/>
        <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH,
                            height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 50,
                            color:"#000",
                            border:3,
                            radius:5,
                            opacity:0.1,
                            x:0,
                            y:2,
                            style:{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1}}}>
            <SelectDriverMapView navigation={navigate} height={50} controlVisible={false}/>
          </BoxShadow>
            <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH,
                                height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
                                color:"#000",
                                border:3,
                                radius:5,
                                opacity:0.1,
                                x:0,
                                y:2,
                                style:{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
                                marginVertical:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}}}>
              <View style={[styles.flexRow,{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,}]}>
                <TouchableOpacity style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 18,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={[styles.textStyle]}>{'General'}</Text>
                </TouchableOpacity>
                <View style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}/>
                <TouchableOpacity style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 18,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={[styles.textStyle]}>{'Locations'}</Text>
                </TouchableOpacity>
                <View style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}/>
                <TouchableOpacity style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 18,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={[styles.textStyle]}>{'Services'}</Text>
                </TouchableOpacity>
                <View style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}/>
                <TouchableOpacity style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 18,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={[styles.textStyle]}>{'Driver'}</Text>
                </TouchableOpacity>
                <View style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}/>
                <TouchableOpacity style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 18,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={[styles.textStyle]}>{'Products'}</Text>
                </TouchableOpacity>
              </View>
            </BoxShadow>

            {_generalList}


      </View>
    );
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
		width:Constants.BaseStyle.DEVICE_WIDTH/100 * 18,
		height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
	},

  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginBottom:10,
    marginTop:0,//10,
    marginLeft:0,//10,
    marginRight:0,//10,
    borderRadius:30,
    backgroundColor: Constants.Colors.White,
    borderColor:Constants.Colors.White,
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:'#53C8E5',
  },
  verticalLine:{
    width:2,
    backgroundColor: '#D7D7D7',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  textStyle:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:'#5D5D5D',
    textAlign:'center',
  },
  orderTextStyle:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:Constants.Colors.Black,//'#5D5D5D',
  },
  orangeTextStyle:{
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:'#F58436',
  },

});
export default connect(state => ({state: state.CustomerReducer}))(Orders_OnGoing);
