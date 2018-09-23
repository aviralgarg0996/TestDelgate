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
} from 'react-native';
import { connect } from 'react-redux';
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import FormTextInput from "../../../components/common/FormTextInput";
import SubmitButton from "../../../components/common/FormSubmitButton";
import ForgotPassword from "../../../components/driver/ForgotPassword";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import Regex from '../../../utilities/Regex';
import _ from "lodash";
//import PhoneVerification from "../../../components/driver/PhoneVerification";
import OtpVerification from "../../../components/driver/OtpVerification";
import ResetPassword from "../../../components/driver/ResetPassword";
import NewUser from "../../../components/driver/NewUser";
import PhoneVerification from "../../../components/driver/PhoneVerification";
import EmailVerification from "../../../components/driver/EmailVerification";

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'himanshu@gmail.com',
      password:'123456',
      ModalVisible:false,
      deviceToken:props.deviceToken
    }
  }

  loginUser(){
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

    if(_.isEmpty(password)) {
      //alert(enterPassword);
      dispatch(ToastActionsCreators.displayInfo('Please enter your password'))
      return;
    }
    // if(!Regex.validatePassword(password)){
    //   //alert(enterValidPassword);
    //   dispatch(ToastActionsCreators.displayInfo('Please enter a valid password'))
    //   return;
    // }

    this.props.UserActions.userLogin({...this.state});
    //dispatch({type:'NEWUSER_VISIBILITY',visibility:true})
    // this.setState({
    //   email:'',
    //   password:''
    // })

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Background style={styles.container}>
        <ScrollView keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps="always" keyboardDismissMode= {(Platform.OS === 'ios') ? 'on-drag' : 'interactive'}>
          <KeyboardAvoidingView behavior={'position'}>
            <Image source={Constants.Images.user.logo} style={styles.logo} resizeMode={'contain'} />
            <Text style={styles.text}>Sign in to your account</Text>
            <FormTextInput
              autoFocus={false}
              ref='email'
              placeHolderText='EMAIL'
              placeHolderColor={Constants.Colors.Blue}
              secureText={false}
              keyboard='email-address'
              isPassword={false}
              showPassword={false}
              onChangeText={(email)=>this.setState({email})}

            />
            <FormTextInput
              autoFocus={false}
              ref='password'
              placeHolderText='PASSWORD'
              placeHolderColor={Constants.Colors.Blue}
              secureText={true}
              isPassword={false}
              showPassword={false}
              onChangeText={(password)=>this.setState({password})}

            />
            <SubmitButton
              onPress={()=>this.loginUser()}
              text="SIGN IN"
            />
          </KeyboardAvoidingView>

          <Text style={[styles.forgotPassword,{color:Constants.Colors.Orange,textDecorationLine:'underline'}]} onPress={() => {this.props.navigation.dispatch({type:'FORGOT_PASSWORD_VISIBILITY',visibility:true})}}>FORGOT PASSWORD?</Text>
          <Text onPress={()=>navigate('Register')} style={styles.register}>
            {`NEW USER? `}
            <Text onPress={()=>navigate('Register')} style={[styles.register,{color:Constants.Colors.Orange,textDecorationLine:'underline'}]}>
              {`REGISTER?`}
            </Text>
          </Text>

          {/* <Modal animationType={"fade"}
           transparent={true}
            visible={this.props.modalstate.PhoneVerificationModalVisible}
             onRequestClose={() => {this.props.navigation.dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})}}>
            <PhoneVerification  navigation={navigate} dispatch={this.props.navigation} />
          </Modal> */}
          {/* {console.warn(this.props.navigation)} */}

          <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.ForgotPassModalVisible} onRequestClose={() => {this.props.dispatch({type:'FORGOT_PASSWORD_VISIBILITY',visibility:false})}}>
            <ForgotPassword navigation={navigate} dispatch={this.props.navigation}/>
          </Modal>

          <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.OtpVerificationModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'OTP_VERIFICATION_VISIBILITY',visibility:false})}}>
            <OtpVerification navigation={navigate} dispatch={this.props.navigation} />
          </Modal>

          <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.ResetPassModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'RESET_PASSWORD_VISIBILITY',visibility:false})}}>
            <ResetPassword navigation={navigate} dispatch={this.props.navigation} />
          </Modal>
          <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.NewUserModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'NEWUSER_VISIBILITY',visibility:false})}}>
            <NewUser navigation={navigate} dispatch={this.props.navigation} />
          </Modal>

          <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.PhoneVerificationModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})}}>
            <PhoneVerification navigation={navigate} dispatch={this.props.navigation} />
          </Modal>

          <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.EmailVerificationModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'EMAILVERIFICATION_VISIBILITY',visibility:false})}}>
            <EmailVerification navigation={navigate} dispatch={this.props.navigation} />
          </Modal>

        </ScrollView>
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
  forgotPassword:{
    fontSize:16,
    fontWeight:'800',
    backgroundColor:'transparent',
    color:Constants.Colors.White,
    textAlign:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 *2
  },
  register:{
    fontSize:16,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 *2
  },
  flexRow:{
    flexDirection: 'row',
  },
  colIndex:{
    flex:1,
  },
});

const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  deviceToken: state.user.deviceToken
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
