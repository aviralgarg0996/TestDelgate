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
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  Modal,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import FormTextInput from "../../../components/common/FormTextInput";
import SubmitButton from "../../../components/common/FormSubmitButton";
import PhoneVerification from "../../../components/driver/PhoneVerification";
import EmailVerification from "../../../components/driver/EmailVerification";
import NewUser from "../../../components/driver/NewUser";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import Regex from '../../../utilities/Regex';
import _ from "lodash";
import PasswordStrengthInput from "../../../components/common/PasswordStrengthInput";

class Register extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      email:'',
      phone:'',
      password:'',
      termsAndConditions:false,
      secureEntry:true,
      passwordEye:false,
      deviceToken:props.deviceToken
    }
  }

  registerUser(){
    let context = this;
    let { dispatch } = this.props.navigation;
    let { email, phone, password } = this.state;
    let { navigate } = this.props.navigation;


    if(_.isEmpty(email.trim())) {
      //alert(enterEmail);
      dispatch(ToastActionsCreators.displayInfo('Please enter your email'))
      return;
    }

    if(!Regex.validateEmail(email.trim())) {
      //alert(enterValidEmail);
      dispatch(ToastActionsCreators.displayInfo('Enter a valid email'))
      return;
    }

    if(_.isEmpty(phone.trim())) {
      //alert(enterMobile);
      dispatch(ToastActionsCreators.displayInfo('Please enter your phone number'))
      return;
    }
    if(!Regex.validateMobile(phone.trim())) {
      //alert(enterValidMobile);
      dispatch(ToastActionsCreators.displayInfo('Please enter a valid phone number'))
      return;
    }

    if(_.isEmpty(password.value)) {
      console.log('empty pasword',password)
      //alert(enterPassword);
      dispatch(ToastActionsCreators.displayInfo('Please enter your password'))
      return;
    }

    if(!Regex.validatePassword(password.value)){
      dispatch(ToastActionsCreators.displayInfo('Password should be minimum 6 characters and must contain at least one capital letter, one special character, one numeric and one lower case letter'))
      return;
    }

    if(this.state.termsAndConditions == false){
      dispatch(ToastActionsCreators.displayInfo('Please accept the terms and conditions'))
      return;
    }
    this.props.UserActions.consumerSignup({...this.state});
    //dispatch({type:'NEWUSER_VISIBILITY',visibility:true})
  }

  termsAndConditions(){
    this.setState({
      termsAndConditions:!this.state.termsAndConditions
    })
  }

  passwordChange(password){
    this.setState({
      password:password
    })
  }

  render() {
    // Enable too short
    const tooShort = {
      enabled: true,
      label: 'Too short',
      labelColor: 'red'
    };
    const { navigate,goBack,dispatch } = this.props.navigation;
    return (
      <Background style={styles.container}>
        <ScrollView keyboardDismissMode={Platform.OS==='ios' ? 'on-drag' : 'interactive'} keyboardShouldPersistTaps="always">
          <KeyboardAvoidingView behavior={'position'}>
            <Image source={Constants.Images.user.logo} style={styles.logo} resizeMode={'contain'} />
            <FormTextInput
              autoFocus={false}
              ref='email'
              placeHolderText='EMAIL'
              placeHolderColor={Constants.Colors.Blue}
              style = {[styles.inputTextViewStyle]}
              secureText={false}
              keyboard='email-address'
              isPassword={false}
              showPassword={false}
              onChangeText={(email)=>this.setState({email})}
            />
            <FormTextInput
              autoFocus={false}
              ref='phone'
              placeHolderText='PHONE'
              placeHolderColor={Constants.Colors.Blue}
              style = {[styles.inputTextViewStyle]}
              secureText={false}
              keyboard='phone-pad'
              isPassword={false}
              maxLength={10}
              showPassword={false}
              onChangeText={(phone)=>this.setState({phone})}
            />

            <PasswordStrengthInput
              minLength={4}
              ruleNames="lowerCase|symbols|words"
              minLevel={0}
              tooShort={tooShort}
              barWidthPercent={65}
              showBarOnEmpty={true}
              secureTextEntry={this.state.secureEntry}
              onChangeText={(password, isValid) => this.setState({ password: { value: password, isValid: isValid } })}
              //style={{borderBottomColor:'transparent'}}
            />

            {this.state.password != '' && <TouchableOpacity
            style={{position:'absolute',right:Constants.BaseStyle.DEVICE_WIDTH/100*5,bottom:Constants.BaseStyle.DEVICE_HEIGHT/100*25}}
             onPress={()=>this.setState({secureEntry:!this.state.secureEntry,passwordEye:!this.state.passwordEye})}>
              <Image source={this.state.passwordEye ? Constants.Images.driver.crossEye : Constants.Images.driver.eye} style={[{width:20, height:20}]} style={styles.eye} resizeMode="contain" />
            </TouchableOpacity>}

            <View underlayColor='#fee989' style={[styles.colIndex,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,marginTop:(Constants.BaseStyle.DEVICE_HEIGHT/100)*4}]}>
              <View style={[styles.flexRow]}>
                <TouchableOpacity onPress={() => this.termsAndConditions()}>
                  <Image source={this.state.termsAndConditions ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[{width:20, height:20}]} resizeMode={'contain'} />
                </TouchableOpacity>
                <Text style={[{color:Constants.Colors.White,flex:1 ,fontSize:14,fontWeight:"900"}]}>  I AGREE TO THE  <Text style={{color:Constants.Colors.Orange,fontSize:14,fontWeight:"900", marginLeft:10,alignSelf:'center',textDecorationLine:'underline'}} onPress={ ()=> Linking.openURL('https://google.com') }>TERMS AND CONDITIONS</Text></Text>
              </View>
            </View>
            <SubmitButton
              onPress={()=>this.registerUser()}
              text="REGISTER"
            />
          </KeyboardAvoidingView>
          <Text style={[styles.goToLogin]}>ALREADY HAVE AN ACCOUNT? <Text onPress={()=>goBack()} style={{color:Constants.Colors.Orange,textDecorationLine:'underline'}}>SIGN IN.</Text></Text>
        </ScrollView>

        <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.PhoneVerificationModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})}}>
          <PhoneVerification navigation={navigate} dispatch={this.props.navigation} />
        </Modal>

        <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.EmailVerificationModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'EMAILVERIFICATION_VISIBILITY',visibility:false})}}>
          <EmailVerification navigation={navigate} dispatch={this.props.navigation} />
        </Modal>
        <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.NewUserModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'NEWUSER_VISIBILITY',visibility:false})}}>
          <NewUser navigation={this.props.navigation} dispatch={this.props.navigation} />
        </Modal>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 30,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 60,
    alignSelf:'center'
  },
  text:{
    fontSize:22,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  goToLogin:{
    fontSize:16,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 *2,
    marginBottom:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
  },
  inputTextViewStyle: {
    borderWidth:3
    // marginTop:Constants.BaseStyle.DEVICE_HEIGHT/200*2,
    // marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/200,
    //borderWidth:1
  },
  flexRow:{
    flexDirection: 'row',
    backgroundColor:'transparent'
  },
  colIndex:{
    flex:1,
  },
  eye:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
    width:Constants.BaseStyle.DEVICE_WIDTH/100*6
  }
});

const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  deviceToken: state.user.deviceToken
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
