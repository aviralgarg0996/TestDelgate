import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import Progress from './components/common/Progress'
import Navigator from "./config/navigator"
import { Toast } from 'react-native-redux-toast';
import Constants from './constants';
import strings from './utilities/StringEn';
import { SafeAreaView } from 'react-navigation';
export default class Root extends Component{
  /* *
   * @constructor: Default constructor
   * */
  constructor(props){
    super(props);
  }

  /* *
   * @function: Default render function
   * */
  render(){
    return (
        <SafeAreaView style={styles.container}>
        	<Progress/>
          <Navigator/>
          <Toast messageStyle={styles.toastStyle} />
        </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#03070B',
  },
  toastStyle:{
     color: Constants.Colors.White,
  }
});