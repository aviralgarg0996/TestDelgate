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
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import SubmitButton from "../../../components/common/FormSubmitButton";
import FormTextInput from "../../../components/common/FormTextInput";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ChangePassword extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      showNewPassword: true,
      showCurrentPassword: true,
      eyeCurrentPassword: false,
      eyeNewPassword: false,
      currentPassword: "",
      newPassword: ""
    };
  }

  onChanges() {}
  currentPassword() {
    this.setState({
      showCurrentPassword: !this.state.showCurrentPassword
    });
  }
  newPassword() {
    this.setState({
      showNewPassword: !this.state.showNewPassword
    });
  }

  newPassChange(newPassword) {
    {
      !newPassword
        ? this.setState({ eyeNewPassword: false })
        : this.setState({ eyeNewPassword: true });
    }
  }
  currentPassChange(currentPassword) {
    {
      !currentPassword
        ? this.setState({ eyeCurrentPassword: false })
        : this.setState({ eyeCurrentPassword: true });
    }
  }
  render() {
    const titleConfig = {
      title: "Change Password",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate ,goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
          leftButton={
            <TouchableOpacity onPress={()=>goBack()}>
              <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
            </TouchableOpacity>
          }
        />

        <View style={styles.subcontainer}>
          <KeyboardAvoidingView behavior={"position"}>
            <View style={styles.textInpuView}>
              <FormTextInput
                style={{
                  width: Constants.BaseStyle.DEVICE_WIDTH * 0.8,
                  marginTop: Constants.BaseStyle.DEVICE_HEIGHT * 0.01
                }}
                autoFocus={false}
                ref="CurrentPassword"
                placeHolderText="Current Password"
                placeHolderColor={Constants.Colors.Blue}
                secureText={this.state.showCurrentPassword}
                isPassword={false}
                showPassword={false}
                onChangeText={currentPassword =>
                  this.currentPassChange(currentPassword)
                }
              />

              {this.state.eyeCurrentPassword == true ? (
                <TouchableOpacity onPress={() => this.currentPassword()}>
                  <Image
                    source={Constants.Images.driver.eye}
                    style={[styles.eyeIcons]}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.textInpuView}>
              <FormTextInput
                style={{
                  width: Constants.BaseStyle.DEVICE_WIDTH * 0.8,
                  marginTop: Constants.BaseStyle.DEVICE_HEIGHT * 0.01
                }}
                autoFocus={false}
                ref="SetNewPassword"
                placeHolderText="Set New Password"
                placeHolderColor={Constants.Colors.Blue}
                secureText={this.state.showNewPassword}
                isPassword={false}
                showPassword={true}
                onChangeText={newPassword => this.newPassChange(newPassword)}
              />

              {this.state.eyeNewPassword == true ? (
                <TouchableOpacity onPress={() => this.newPassword()}>
                  <Image
                    source={Constants.Images.driver.eye}
                    style={[styles.eyeIcons]}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <SubmitButton
              onPress={() => this.onChanges()}
              text={"CHANGES"}
              style={[styles.ButtonStyle, { backgroundColor: "#53C8E5" }]}
              textStyle={[{ fontSize: 15 }]}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subcontainer: {
    flex: 1,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  eyeIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    position: "absolute",
    right: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3.5,
    top: -Constants.BaseStyle.DEVICE_WIDTH / 100 * 5.0
  },
  textInpuView: {
    flexDirection: "row",

    alignItems: "center"
  },

  ButtonStyle: {
    backgroundColor: "rgba(115,115,115,0.4)",

    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100,
    borderRadius: 5,
    shadowColor: Constants.Colors.LightGray,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderRadius: 2
  }
});
