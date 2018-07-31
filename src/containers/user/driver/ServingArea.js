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
  TextInput,Switch
} from "react-native";


import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import ServingAreaList from "../../../components/driver/ServingAreaList";
import Icon from "react-native-vector-icons/FontAwesome";
export default class ServingArea extends Component<{}> {
  constructor(props) {
    super(props);
    this.state={
      available:true
    }
  }
    setAvailability(){
      this.setState({
        available:!this.state.available
      })
    }

addCities(){

}

  render() {
    const titleConfig = {
      title: "DEFAULT SERVING AREA",
      tintColor: "#fff",
      style: { fontSize: 16, fontWeight: "600" }
    };
    const { navigate, goBack } = this.props.navigation;
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
            <Switch
              onChange={()=>this.setAvailability()}
              value={this.state.available}
              style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} />
          </View>
        }
        leftButton={
          <TouchableOpacity onPress={() => goBack()}>
            <Icon
              name="angle-left"
              size={40}
              color="white"
              style={[
                styles.navIcons,
                { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }
              ]}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.sectionHeaders}>
        <Text style={styles.textBlue}>Look for a city to serve</Text>
        <TouchableOpacity>
          <Text style={styles.textOrange}>Manage Schedule</Text>
        </TouchableOpacity>
      </View>

        <TouchableOpacity onPress={() => this.addCities()}>

        <View style={styles.citySection}>
          <Text style={styles.textBlue}>Add Cities</Text>

          <Image
            source={Constants.Images.driver.circleplus}
            style={styles.addIcons} resizeMode={'contain'}/>

        </View>

          </TouchableOpacity>
      <ServingAreaList/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.White,

  },
  subcontainer: {
  paddingHorizontal: Constants.BaseStyle.PADDING * 0.8,
  paddingVertical: Constants.BaseStyle.PADDING * 0.2,
    flexDirection: "row",

  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  sectionHeaders:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:Constants.BaseStyle.PADDING * .5,
    alignItems:'center'
  },
  textBlue:{
    fontSize:14,
    color:Constants.Colors.Blue
  },
  textOrange:{
    fontSize:14,
    color:Constants.Colors.Orange
  },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center'
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  addIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4
  },
  citySection: {
    marginHorizontal:10,
alignItems:'center',
    flexDirection:'row',
justifyContent:'space-between',
borderBottomWidth:1,
borderBottomColor:Constants.Colors.Blue,

  },

});
