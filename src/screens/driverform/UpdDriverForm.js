import React, { Component } from 'react'
import {View} from "react-native"
import PersonalInfo from "./PersonalInfo"
import VehicleInfo from "./VehicleInfo"
var ScrollableTabView = require('react-native-scrollable-tab-view');
export default class DriverForm extends Component {
  constructor(props)
  {
    super(props);
  }
  componentWillMount = () => {
    alert(this.props.navigation)
  }
  
  render() {
    return (
        <ScrollableTabView>
        <PersonalInfo tabLabel="Personal Information" />
        <VehicleInfo navigation={this.props.navigation} tabLabel="Vehicle Information" />
      </ScrollableTabView>
    )
  }
}
