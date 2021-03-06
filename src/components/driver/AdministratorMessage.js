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
  TouchableHighlight,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";


class AdministratorMessage extends Component<{}> {
  constructor(props){
    super(props);

  }
  onPress()
  {
      this.props.dispatch({type : 'ADMIN_MESSAGE_VISIBILITY', visibility:false});
  }


  render() {
    return (
      <View  style={[styles.modalOuter]}>
          <View  style={styles.modalInner}>
            <KeyboardAvoidingView behavior={'position'}>
              <TouchableHighlight underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {this.props.dispatch({type : 'ADMIN_MESSAGE_VISIBILITY', visibility:false})}}>
                <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]}/>
               </TouchableHighlight>
               <View>
                   <View style={[styles.viewStyle]}>
                      <Text style={styles.Headertext}>{Constants.Strings.AdminMessage.title}</Text>
                      <Text style={styles.Subheadtext}>{Constants.Strings.AdminMessage.desc}</Text>
                   </View>
                   <SubmitButton
                     onPress={() => this.onPress()}
                     text={Constants.Strings.AdminMessage.buttonText}
                     style={[styles.ButtonStyle]}
                   />
                 </View>
            </KeyboardAvoidingView>
              <Text onPress={()=>console.log('hello')} style={styles.recieveMsg}>VIEW</Text>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalOuter: {
			backgroundColor: 'rgba(0,0,0,0.8)',
			padding: 4,
			flex:1,
			alignItems:'center',
			justifyContent:'center',
		},
	modalInner:{
		margin: 10,
	  padding:3,
		backgroundColor:'#fff',
		position: 'relative',
	},
  btCloseModal:{
			width: 20,
			height:20,
			borderRadius:20,
	},
  btnCloseModalIcon:{
		width:20,
		height:20,
	},
  viewStyle: {
    borderBottomColor: Constants.Colors.White,
    borderBottomWidth: 1,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    marginVertical: Constants.BaseStyle.DEVICE_HEIGHT*6/100,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
    borderRadius:2,
    //paddingTop : Constants.BaseStyle.DEVICE_WIDTH*6/100,
    //paddingBottom : Constants.BaseStyle.DEVICE_WIDTH*6/100,
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    borderRadius:5,
    //marginBottom : 25
  },
  Headertext:{
    fontSize:20,
    marginBottom:15,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  Subheadtext:{
    fontSize:15,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
    fontWeight:'500',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  recieveMsg:{
    fontSize:16,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Orange,
    textAlign:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 *2,
    marginBottom : 10
  },

});

export default connect(state => ({modalstate: state.ModalHandleReducer}))(AdministratorMessage);
