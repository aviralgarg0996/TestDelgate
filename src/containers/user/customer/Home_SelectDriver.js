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

import HeaderBackground from '../../../components/customer/HeaderBackground';
import Constants from "../../../constants";
import SelectDriverMapView from '../../../components/customer/SelectDriverMapView';
import Home_SelectDriverList from '../../../components/customer/Home_SelectDriverList';
import ShadowButton from "../../../components/customer/ShadowButton";

import { ToastActionsCreators } from 'react-native-redux-toast';
import {BoxShadow} from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';

var strAddress='228 Park Ave S, New York, NY 10003, USA';


class Home_SelectDriver extends Component<{}> {
  constructor(props){
    super(props);

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

    return (
      <View style={[styles.container,{backgroundColor:'#ffffff'}]}>
        <HeaderBackground navigation={navigate} goBack={goBack}/>
        {/*<View  style = {styles.searchContainer}>
          <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'}/>
          <TextInput autoFocus={false} onChangeText={(text) => this.FilterCityList(text)} style={styles.txtInputSearch} placeholder={'Type address here'} underlineColorAndroid="transparent" />
        </View>*/}

        <ScrollView style={[styles.container]}>
            <SelectDriverMapView navigation={navigate} height={60} controlVisible={true}/>

            <Home_SelectDriverList navigation={navigate}/>

            <ShadowButton
              onPress={() => console.log('hello')}
              text={'PLACE IN THE POOL'}
              bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
              style={[styles.ButtonStyle]}
              textStyle={[styles.ButtonTextStyle]}
            />
          </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor:'transparent',//Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  navBarRight:{
			flex:1,
			flexDirection:'row',
			height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
			//marginTop:0,
			alignItems:'center',
			justifyContent:'flex-end',
			backgroundColor:'transparent',
      marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
		},
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },

  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 9,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 9,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  searchContainer:{
    backgroundColor:'#fff',
    justifyContent:'center',
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    flexDirection:'row',
    alignItems:'center',
    padding:5,
    //paddingLeft: 10,
    //paddingRight:10,
    marginLeft:15,
    marginRight:15,
    //marginTop:10,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,

  },
  searchContentIcon: {
    //tintColor:'#898988',
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
  },
  txtInputSearch: {
    backgroundColor:'#fff',
    color: '#5D5D5D',
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    //paddingRight:10,
    //paddingTop:3,
    //paddingBottom:3,
    flex:1,
    //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
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
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:Constants.Colors.White,
  },


});
export default connect(state => ({state: state.CustomerReducer}))(Home_SelectDriver);
