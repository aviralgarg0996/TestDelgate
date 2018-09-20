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
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import DeliveryDetails from './DeliveryDetails';
import OrderDisplay from './OrderDisplay';
class MapModule extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      mapRegion:{
        longitude:30.7046,
        latitude:76.7179,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
    this.mapRegion = this.state.mapRegion;
  }

  render() {
    let {
      moneytitle,money,timeleft,id,date,timeframe,list,navigate,bottomText1,bottomText2,ButtonScreenNo,schedule
    } = this.props;
    return (
      <View style={{flex:1, backgroundColor:Constants.Colors.White}}>
        <ScrollView>
          <MapView
            //provider={PROVIDER_GOOGLE}
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}}
            //onRegionChangeComplete={onRegionChangeComplete}
            //region={this.state.mapRegion}
            //annotations={this.state.annotations}
            zoomEnabled={false}
            //showsUserLocation={true}
            pitchEnabled={false}
            rotateEnabled={false}
            //customMapStyle={Constants.MapStyle}
          />
          { this.props.orderstate.ScreenMaxFlag===true ?
          <View style={{bottom: Constants.BaseStyle.DEVICE_HEIGHT/100 * 15,}}>
            <View style={styles.orderDetails}>
              <OrderDisplay
                moneytitle={moneytitle}
                money={money}
                timeleft={timeleft}
                id={id}
                date={date}
                timeframe={timeframe}
                list={list}
                bottomText1={bottomText1}
                bottomText2={bottomText2}
                schedule={schedule}
              />
            </View>
              <DeliveryDetails navigate={navigate} ButtonScreenNo={ButtonScreenNo}/>
          </View>
          :
          <View style={{bottom: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2,}}>
            <TouchableOpacity onPress={() => {this.props.dispatch({type : 'SET_SCREENSIZE',flag:true})}}>
              <Image
                style={styles.smallIcon}
                source={Constants.Images.driver.down}
              />
            </TouchableOpacity>
            <View style={[styles.orderDetails,{ backgroundColor: Constants.Colors.White,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3}]}>
                <View style={[styles.row,{marginBottom:10}]}>
                  <View style={{flex:0.60}}>
                    <Text style={[styles.itemInBlue,{fontSize: 16,fontWeight:'900'}]}>{moneytitle}
                      <Text style={[styles.itemInOrange,{fontSize: 16,fontWeight:'900'}]}>{money}</Text>
                    </Text>
                  </View>
                  <View style={[styles.itemRight,{flex:0.40}]}>
                    <Image
                      style={styles.Icon}
                      source={Constants.Images.driver.clock}
                    />
                    <Text style={styles.itemInBlue}>{timeleft}{' left'}</Text>
                  </View>
                </View>

                <View style={[styles.row,{marginBottom:10}]}>
                  <View style={{flex:1}}>
                    <Text style={[styles.itemInBlue,{fontSize:14,textAlign:'left',fontWeight:'900'}]}>{id}</Text>
                    <Text style={[styles.itemInBlue,{fontSize:12,textAlign:'left',fontWeight:'400'}]}>{'Time Frame :'}{timeframe}</Text>
                  </View>
                  <View style={{flex:1,justifyContent:'flex-end'}}>
                    <SubmitButton
                      onPress={() => console.log('Hello')}
                      text={'FAILED'}
                      style={[styles.ButtonStyle,{backgroundColor:Constants.Colors.LightBlue,borderColor: Constants.Colors.LightBlue,marginBottom:10,marginTop:10}]}
                      textStyle={[{fontSize:12,color:Constants.Colors.White}]}
                    />
                  </View>
                </View>
            </View>
            <DeliveryDetails navigate={navigate} ButtonScreenNo={ButtonScreenNo}/>
          </View>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderDetails:{
    width:Constants.BaseStyle.DEVICE_WIDTH/100 *90,
    alignSelf:'center',
  },
  orderDetailsMin:{
    width:Constants.BaseStyle.DEVICE_WIDTH/100 *60,
    alignSelf:'center',
  },
  row : {
    flexDirection:'row',
  },
  col : {
    flex:1,
  },
  smallIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    transform: [{rotate: '180deg'}],
  },
  Icon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  itemInBlue: {
    fontSize: 13,
    color: Constants.Colors.Blue
  },
  itemInOrange: {
    fontSize: 13,
    color: Constants.Colors.Orange
  },
  itemRight: {
    flexDirection: "row",
    //height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    alignItems: "center",
    justifyContent:'flex-end'
  },
  ButtonStyle: {
    borderWidth: 1,
    padding:0,
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: Constants.Colors.Blue,
    borderColor: Constants.Colors.Blue,
    marginTop: 5,//Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:0,//(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    borderRadius:10,
  },
});

export default connect(state => ({orderstate: state.OrdersHandleReducer}))(MapModule);
