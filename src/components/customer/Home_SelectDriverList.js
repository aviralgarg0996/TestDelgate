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

import Constants from "../../constants";
import ShadowButton from "../../components/customer/ShadowButton";

import StarRating from "../../components/driver/StarRating";

import Carousel from 'react-native-snap-carousel';
import {BoxShadow} from 'react-native-shadow';

export default class Home_SelectDriverList extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      driverList : [{id:1,img:Constants.Images.customer.driver,followerFlag:0},
                    {id:2,img:Constants.Images.customer.driver1,followerFlag:0},
                    {id:3,img:Constants.Images.customer.driver2,followerFlag:0},
                    {id:4,img:Constants.Images.customer.driver,followerFlag:0},
                    {id:5,img:Constants.Images.customer.driver,followerFlag:0},
                    {id:6,img:Constants.Images.customer.driver,followerFlag:0},
                    ],

    }
  }

  displayDriversData({item, index})
  {
    const shadowForItem = {width:Constants.BaseStyle.DEVICE_WIDTH/100 * 78,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 50,
                        color:"#000",
                        border:1,
                        radius:5,
                        opacity:0.1,
                        x:1,
                        y:1,
                        style:{backgroundColor: Constants.Colors.White,
                        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
                        bottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
                        //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1.5/100,
                      }
    };
    return(
      <BoxShadow setting={shadowForItem}>
        <View style={[styles.container, {width:Constants.BaseStyle.DEVICE_WIDTH/100 * 76}]}>

          <View style={styles.rootContainer}>
            <ImageBackground source={Constants.Images.customer.drivercover} style={styles.imageCover}  resizeMode={'contain'}>
            </ImageBackground>
            <View style={styles.subContainer}>
              <Image style={styles.imageProfile} source={item.img} resizeMode={'contain'}/>
              <View>
                <Text style={[styles.nameText]}>Chris Evans</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text  style={[styles.reviewText,{color : Constants.Colors.LightBlue,textDecorationLine:'underline'}]}>
                      45 REVIEWS
                  </Text>
                  <Text  style={[styles.reviewText,{color: '#969297', marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1 , marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3}]}>
                    50 FOLLOWERS
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2,marginTop: Constants.BaseStyle.DEVICE_WIDTH*4/100}}>
            <StarRating
              rating={"5"}
              iconWidth={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
              iconHeight={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
            />
            <View style={{ flexDirection: "row"}}>
              <View style={{flex:0.5,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,}}>
                <Text style={[styles.orangeText]}>{'78 '}
                  <Text style={[ styles.reviewText, { color: Constants.Colors.LightGray,fontSize:14, }]}>
                    {'Orders Delivered'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH/100*70,
                              height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6.8,
                              color:"#000",
                              border:3,
                              radius:20,
                              opacity:0.1,
                              x:0,
                              y:2,
                              style:{marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
                              marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}}}>
            <TouchableOpacity activeOpacity={0.5} style={[styles.ButtonStyle]} onPress={() => console.log('hello')}>
              <Text style={[styles.ButtonTextStyle]}>
                {'SELECT DRIVER'}
              </Text>
            </TouchableOpacity>
          </BoxShadow>


        </View>
        </BoxShadow>

    )

  }



  render() {

    return (
      <View>
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.driverList}
              renderItem={this.displayDriversData}
              sliderWidth={Constants.BaseStyle.DEVICE_WIDTH}
              itemWidth={Constants.BaseStyle.DEVICE_WIDTH/100*80}
              layout={'default'}
              inactiveSlideOpacity={0.2}
              inactiveSlideScale={0.9}
              activeSlideOffset={10}
              firstItem={1}
              loop={true}
            />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.White,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    //alignItems:'top',

  },
  driverText:{
    color:'#081933',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    fontSize:Constants.CustomerFonts.BigSize.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1.5/100,
  },
  flexRow:{
		flexDirection: 'row',
	},
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 26,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
     //position: "absolute",
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
  },
  imageCover: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 22,
    //width: Constants.BaseStyle.DEVICE_WIDTH/100*80,
  },
  imageProfile: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25,
    borderWidth: 2,
    borderColor: Constants.Colors.White,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
  },
  nameText: {
    color: '#0D4A7C',
    fontSize:19,//Constants.CustomerFonts.BigSize.fontSize,
    fontWeight : '900',//Constants.CustomerFonts.BigSize.fontFamily,
    paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
    paddingVertical: Constants.BaseStyle.PADDING * 0.2,
    //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
  },
  reviewText: {
    color: '#0D4A7C',
    fontSize:12,//Constants.CustomerFonts.normal.fontSize,
    //fontFamily:Constants.CustomerFonts.normal.fontFamily,
    paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
    //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
  },
  update:{
    color: '#414141',
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    //paddingVertical: Constants.BaseStyle.PADDING * 0.3,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginTop:Constants.BaseStyle.DEVICE_WIDTH*4/100,
  },
  newPhotoText:{
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    color: '#969297',
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },
  newImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 11,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 21,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2.5
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //width:Constants.BaseStyle.DEVICE_WIDTH/100*70,
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
    textAlign: "center",
  },
  orangeText: {
    color: Constants.Colors.Orange,
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },
});
