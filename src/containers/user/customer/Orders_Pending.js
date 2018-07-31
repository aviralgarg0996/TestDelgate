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
import Orders_PendingGeneral from '../../../components/customer/Orders_PendingGeneral';
import Orders_PendingLocation from '../../../components/customer/Orders_PendingLocation';
import Orders_PendingServices from '../../../components/customer/Orders_PendingServices';
import ShadowButton from "../../../components/customer/ShadowButton";

import { ToastActionsCreators } from 'react-native-redux-toast';
import {BoxShadow} from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';

var strAddress='228 Park Ave S, New York, NY 10003, USA';


class Orders_Pending extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      generalFlag:1,
      locationFlag:0,
      servicesFlag:0,
      productFlag:0,
    }
  }

  setControlTextColor(value)
  {
    if(value==1)
      return [styles.textStyle,{color:'#53C8E5'}];
    else {
      return [styles.textStyle];
    }
  }

  onClickGeneral()
  {
    this.setState({generalFlag:1,
    locationFlag:0,
    servicesFlag:0,
    productFlag:0,});
  }

  onClickLocation()
  {
    this.setState({generalFlag:0,
    locationFlag:1,
    servicesFlag:0,
    productFlag:0,});
  }

  onClickServices()
  {
    this.setState({generalFlag:0,
    locationFlag:0,
    servicesFlag:1,
    productFlag:0,});
  }

  onClickProducts()
  {
    this.setState({generalFlag:0,
    locationFlag:0,
    servicesFlag:0,
    productFlag:1});
  }



  render() {

    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={[styles.container,{backgroundColor:Constants.Colors.White}]}>
        <HeaderBackgroundWithBackButton navigation={navigate} goBack={goBack} headerText={'Pending Order'}/>

          <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH,
                            height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 48.2,
                            color:"#000",
                            border:3,
                            radius:5,
                            opacity:0.1,
                            x:0,
                            y:2,
                            style:{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1}}}>
            <SelectDriverMapView navigation={navigate} height={48} controlVisible={false}/>
          </BoxShadow>
            <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH,
                                height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7.2,
                                color:"#000",
                                border:3,
                                radius:5,
                                opacity:0.1,
                                x:0,
                                y:2,
                                style:{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
                                marginVertical:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}}}>
              <View style={[styles.flexRow,{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,}]}>
                <TouchableOpacity onPress={() => this.onClickGeneral()} style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 22,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={this.setControlTextColor(this.state.generalFlag)}>{'General'}</Text>
                </TouchableOpacity>
                <View style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}/>
                <TouchableOpacity onPress={() => this.onClickLocation()} style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 22,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={this.setControlTextColor(this.state.locationFlag)}>{'Locations'}</Text>
                </TouchableOpacity>
                <View style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}/>
                <TouchableOpacity onPress={() => this.onClickServices()} style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 22,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={this.setControlTextColor(this.state.servicesFlag)}>{'Services'}</Text>
                </TouchableOpacity>
                <View style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}/>
                <TouchableOpacity onPress={() => this.onClickProducts()} style={[{width: Constants.BaseStyle.DEVICE_WIDTH/100 * 22,justifyContent:'center',alignItems:'center'}]}>
                  <Text style={this.setControlTextColor(this.state.productFlag)}>{'Products'}</Text>
                </TouchableOpacity>
              </View>
            </BoxShadow>

            {this.state.generalFlag==1 ?
              <Orders_PendingGeneral/>
            : this.state.locationFlag == 1 ?
              <Orders_PendingLocation/>
            : this.state.servicesFlag == 1 ?
              <Orders_PendingServices/>
            : null
            }

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
    fontSize:Constants.CustomerFonts.small_13.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:'#5D5D5D',
    textAlign:'center',
  },

});
export default connect(state => ({state: state.CustomerReducer}))(Orders_Pending);
