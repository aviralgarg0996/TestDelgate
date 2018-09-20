import React, { Component } from 'react'
import {View} from "react-native"
import PersonalInfo from "./PersonalInfo"
import VehicleInfo from "./VehicleInfo"
var ScrollableTabView = require('react-native-scrollable-tab-view');
export default class DriverForm extends Component {
  render() {
    return (
        <ScrollableTabView>
        <PersonalInfo tabLabel="Personal Information" />
        <VehicleInfo tabLabel="Vehicle Information" />
      </ScrollableTabView>
    )
  }
}
