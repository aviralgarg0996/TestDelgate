import React, { Component } from "react";
import {
  View,
} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay'

class Loader extends Component {
	constructor(props) {
    super(props);
    this.state = {
		visible:true
    };

    //setTimeout(() => {
      //this.props.navigation.navigate("AppIntroduction")
    //}, 2000);
  }
  componentDidMount(){
  	let context = this;
  	setTimeout(() => {
  		context.setState({visible:false});
  	},350)
  }

  render() {
    return (
    	<Spinner visible = {this.state.visible}/>
    );
  }
}

module.exports = Loader;
