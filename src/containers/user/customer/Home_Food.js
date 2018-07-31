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
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import {BoxShadow} from 'react-native-shadow';

import { ToastActionsCreators } from 'react-native-redux-toast';

//import CustomerConnection from "../../../config/CustomerConnection";

class Home_Food extends Component<{}> {
  constructor(props){
    super(props);

  }

  OnClickFood()
  {
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;

    var REQUEST_URL='http://18.205.68.238:9000/api/dgunit/get/?type=food';
    fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((arr) => {
              dispatch({type : 'SET_FOODRANGE', range : arr.data.dishes, _deliverytype : 0,_weight:3});
              navigate('Home_Services');
          });

  }
  OnClickDocument()
  {
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;

    var REQUEST_URL='http://18.205.68.238:9000/api/dgunit/get/?type=documents';
    fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((arr) => {
              dispatch({type : 'SET_FOODRANGE', range : arr.data.envelops ,_deliverytype:1,_weight:arr.data.weight});
              navigate('Home_ServicesDoc');
          });

  }

  OnClickCourier()
  {
    let { navigate } = this.props.navigation;
    let { dispatch } = this.props.navigation;
    var unit={
            weight: 10,
            height: 1,
            width: 1,
            depth: 1,
            isSkid:false,
        };

    dispatch({type : 'SET_COURIER_UNITS'});
    navigate('Home_ServicesItemsCourier');
  }

  OnClickFurniture()
  {
    let { navigate } = this.props.navigation;
    let { dispatch } = this.props.navigation;


    dispatch({type : 'SET_FURNITURE_UNITS'});
    navigate('Home_ServicesItemsFurniture');
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const shadowOpt = {width:Constants.BaseStyle.DEVICE_WIDTH/100*44,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 26,
                        color:"#000",
                        border:3,
                        radius:10,
                        opacity:0.1,
                        x:2,
                        y:2,
                        style:{marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
                                marginVertical: Constants.BaseStyle.DEVICE_WIDTH*3/100,}
    };
    return (
      <View style={[styles.container]}>
        <HeaderBackground navigation={navigate} goBack={goBack}/>

        <HeaderMenu navigation={navigate}/>

        <View style={[styles.container,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*3/100}]}>
          <View style={styles.flexRow}>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity  style={[styles.cardView]} onPress={() => this.OnClickFood()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.food} style={[styles.imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Food'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity style={[styles.cardView]} onPress={() => this.OnClickDocument()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.documents} style={[styles.doc_imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Documents'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
          </View>
          <View style={styles.flexRow}>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity style={[styles.cardView]} onPress={() => this.OnClickFurniture()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.furniture} style={[styles.furniture_imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Furniture & Appliances'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity  style={[styles.cardView]} onPress={() => this.OnClickCourier()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.courier} style={[styles.doc_imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Courier & \r\nFrieght'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f4f5f7',
  },
  flexRow:{
		flexDirection: 'row',
	},
  cardView : {
    backgroundColor:'#fff',
		//borderColor:'#fff',
		//borderWidth:1,
    //marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,
    //borderColor: '#fff',
    //padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*3/100,
    width:Constants.BaseStyle.DEVICE_WIDTH/100 * 44,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 26,
    borderRadius:10,
  },
  contentStyle:{
    width:Constants.BaseStyle.DEVICE_WIDTH/100 * 44,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 26,
    alignItems:'center',
    justifyContent:'center',
    //padding:10,
  },
  imgSize:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 28,
  },
  doc_imgSize:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 22,
  },
  furniture_imgSize:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 30,
  },

  textStyle:{
    textAlign:'center',
    //fontSize:Constants.CustomerFonts.BigSize.fontSize,
    fontSize:19,
    //lineHeight:24,
    fontFamily:Constants.CustomerFonts.bold.fontFamily,
    color:'#212123',

  },
});
export default connect(state => ({state: state.CustomerReducer}))(Home_Food);
