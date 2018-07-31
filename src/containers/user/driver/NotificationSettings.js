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
  TextInput
} from "react-native";

import SwitchButton from "../../../components/common/SwitchButton";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Icon from "react-native-vector-icons/FontAwesome";
export default class NotificationSettings extends Component<{}> {
  constructor(props) {
    super(props);

  }

  onSave() {}

  render() {
    const titleConfig = {
      title: "NOTIFICATIONS",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
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
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>New Order</Text>
          <View style={styles.switchOne}>
            <SwitchButton />
            <Text style={styles.settingTxt}>App Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>Order Update</Text>
          <View style={styles.switchOne}>
            <SwitchButton />
            <Text style={styles.settingTxt}>Push Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>Chat</Text>
          <View style={styles.switchOne}>
            <SwitchButton />
            <Text style={styles.settingTxt}>Push Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>Support Team</Text>
          <View style={styles.switchOne}>
            <SwitchButton />
            <Text style={styles.settingTxt}>Push Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.headTxt}>Sound Notifications</Text>
            <View style={styles.switchOne}>
              <SwitchButton />

            </View>
            <View style={styles.switchTwo}>

            </View>
            <View style={styles.switchTwo}>

            </View>
            </View>

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
  headTxt: {

    flex:4,
    fontWeight:'800',
    color: Constants.Colors.Gray,
    fontSize: 13,
    padding: Constants.BaseStyle.PADDING * 0.5
  },
  settingTxt: {
    textAlign:'center',
    color: Constants.Colors.Gray,
    fontSize: 11,
    padding: Constants.BaseStyle.PADDING * 0.2
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
    switchOne:{
      flex: 3 ,alignItems: "center",marginTop:5},
      switchTwo:{
        flex: 2 ,alignItems: "center",marginTop:5}
});
