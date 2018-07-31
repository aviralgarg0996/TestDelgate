/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';

import Background from '../common/Background';
import Constants from "../../constants";
import NavigationBar from "react-native-navbar";
import MapView from './MapView';
import DeliveryDetails from './DeliveryDetails';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

var OrderData = [
  {
    id: 1,
    type1: "Categories",
    type2: "Furniture",
    type3: 'Urgancy',
    type4: 'Regular 6 hours',
    type5: 'Distance',
    type6: '150 KM',
    type7 : 'Within KM',
    type8 : '10',
  },
];
var ScheduleData = [
  {
    id:1,
    schedule:'9:00 AM to 11:00 AM Brampton, ON',
  },
  {
    id:2,
    schedule:'11:30 AM to 11:00 PM Hamilton, ON',
  },
  {
    id:3,
    schedule:'2:00 PM to 3:00 PM Brampton, ON',
  },
];

class AvailableOrders extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      OrderData,
      ScheduleData,
      available: true,
    };
  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    });
  }

  render() {
    const titleConfig = {
      title: "AVAILABLE ORDER",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };

    const { navigate,goBack } = this.props.navigation;

    var _orderdisplay = this.state.OrderData.map((Val,i) =>
    {
      return (
        <View key={i}>
          <View key={i+1} style={[{flexDirection:'row', marginTop:5,marginBottom:5}]}>
            <View key={i+2} style={{flex:1}}><Text style={styles.itemInBlue}>{Val.type1}{': '}{Val.type2}</Text></View>
            <View key={i+3} style={{flex:1}}><Text style={styles.itemInBlue}>{Val.type3}{': '}{Val.type4}</Text></View>
          </View>
          <View key={i+4} style={[{flexDirection:'row', marginTop:5,marginBottom:5}]}>
            <View key={i+5} style={{flex:1}}><Text style={styles.itemInBlue}>{Val.type5}{': '}{Val.type6}</Text></View>
            <View key={i+6} style={{flex:1}}><Text style={styles.itemInBlue}>{Val.type7}{': '}{Val.type8}</Text></View>
          </View>
        </View>
      )
    });
    var _schedule = this.state.ScheduleData.map((Val,i) =>
    {
      return (
          <View key={i} style={{flex:1}}>
            <Text style={styles.itemInBlue}>{Val.schedule}</Text>
          </View>
        )
    });

    return (
      <View style={styles.container}>
      <NavigationBar
        statusBar={{hidden:true}}
        style={styles.navigationBar}
        title={titleConfig}
        rightButton={
          <View style={styles.rightButtonNav}>
            <TouchableOpacity onPress={()=>navigate('Settings')}>
              <Image
                source={Constants.Images.user.setting}
                style={styles.navIcons} resizeMode={'contain'}/>
            </TouchableOpacity>
            <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
              <Switch
                onValueChange={()=>this.setAvailability()}
                value={this.state.available}
                barHeight={Constants.BaseStyle.DEVICE_HEIGHT/100 * 5}
                backgroundActive={Constants.Colors.Blue}
                backgroundInactive={Constants.Colors.Gray}
                circleActiveColor={Constants.Colors.White}
                circleInActiveColor={Constants.Colors.WhiteBlur}
                changeValueImmediately={true}
                />
            </View>
          </View>
        }
        leftButton={
          <TouchableOpacity onPress={()=>goBack()}>
            <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
          </TouchableOpacity>
        }
      />
        <MapView
          moneytitle="You will receive: "
          money={this.props.orderstate.OrderData.price}
          timeleft={this.props.orderstate.OrderData.time}
          id={this.props.orderstate.OrderData.idno}
          date={this.props.orderstate.OrderData.date}
          timeframe={this.props.orderstate.OrderData.timeframe}
          list={_orderdisplay}
          navigate={navigate}
          bottomText1='Notes'
          bottomText2=''
          ButtonScreenNo='1'
          schedule={_schedule}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  rightButtonNav: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  itemInBlue: {
    fontSize: 12,
    color: Constants.Colors.Blue
  },

});
export default connect(state => ({orderstate: state.OrdersHandleReducer}))(AvailableOrders);
