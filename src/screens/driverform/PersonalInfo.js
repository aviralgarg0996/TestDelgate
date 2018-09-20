import React, { Component } from 'react'
import {ScrollView,View,Text,StyleSheet,TextInput,Dimensions,Button,TouchableOpacity,Image} from "react-native"
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import { bindActionCreators } from "redux";
import Background from '../../components/common/Background';
import ImagePicker from "react-native-image-picker";
import Toast, {DURATION} from 'react-native-easy-toast'
import Constants from "../../constants"
import * as UserActions from '../../redux/modules/user';
import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window');

class PersonalInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      ExperienceInputView : [<View style={styles.rowContainerStyle}>
        <View>
          <Text>Experience Type</Text>
          <TextInput
          key="0"
                style={styles.textInputStyle}
                placeholder="First Name"
              />
          </View>
        <View>
          <Text>Total Experience</Text>
          <TextInput
          key="0"
                style={styles.textInputStyle}
                placeholder="Last Name"
              />
          </View>
          
        </View>],
        ExperienceImageSource:"",
        ProfileImageSource:"",
        firstName:"",
        lastName:"",
        birthDate:"",
        sinNumber:"",
        licenceNumber:"",
        address:"",
        aboutYou:"",
        licenceIssueDate:"",
        licenceExpiryDate:"",
        sex:""

    }
  }

  addTextInput = (key) => {
    let ExperienceInputView = this.state.ExperienceInputView;
    ExperienceInputView.push(<View style={styles.rowContainerStyle}>
      <View>
        <Text>Experience Type</Text>
        <TextInput
              style={styles.textInputStyle}
              placeholder="First Name"
            />
        </View>
      <View>
        <Text>Total Experience</Text>
        <TextInput
              style={styles.textInputStyle}
              placeholder="Last Name"
            />
        </View>
      </View>);
    this.setState({ ExperienceInputView })
  }
  openExperienceImagePicker=(imageType)=>{
    ImagePicker.showImagePicker( (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log("else")
        let source = { uri: response.uri };
if(imageType=='experience')
        this.setState({
          ExperienceImageSource: source
        });
        else if(imageType=='profile')
        this.setState({
          ProfileImageSource: source
        });
      }
    });
  }

  onSubmitPersonalData=()=>{
    // if(this.state.firstName=="")
    // this.refs.toast.show('Please Enter First Name!',DURATION.LENGTH_LONG);
    // else if(this.state.lastName=="")
    // this.refs.toast.show('Please Enter Last Name!',DURATION.LENGTH_LONG);
    // else if(this.state.birthDate=="")
    // this.refs.toast.show('Please Select Birth Data!',DURATION.LENGTH_LONG);
    // else if(this.state.genderData=="")
    // this.refs.toast.show('Please Select Gender!',DURATION.LENGTH_LONG);
    // else if(this.state.sinNumber=="")
    // this.refs.toast.show('Please Enter SIN Number!',DURATION.LENGTH_LONG);
    // else if(this.state.licenceNumber=="")
    // this.refs.toast.show('Please Enter Licence Number!',DURATION.LENGTH_LONG);
    // else
    this.props.UserActions.userDriverForm({...this.state});
  }

  render() {
    let genderData = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Others',
    }];
    return (
      <Background style={styles.mainContainer}>
     <ScrollView style={styles.container}>
<View style={styles.rowContainerStyle}>
<Toast
                    ref="toast"
                    style={{backgroundColor:'yellow'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
<View>
  <Text>First Name</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="First Name"
        value={this.state.firstName}
        onChangeText={(text) => this.setState({firstName:text})}
      />
  </View>
<View>
  <Text>Last Name</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="Last Name"
        value={this.state.lastName}
        onChangeText={(text) => this.setState({lastName:text})}
      />
  </View>
</View>


<View style={styles.rowContainerStyle}>
<View>
  <Text>Date Of Birth</Text>
  <DatePicker
        style={{width: width*0.45,marginTop:height*0.03}}
         date={this.state.birthDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1980-05-01"
        maxDate="2015-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.setState({birthDate: date})}}
      />
  </View>
<View>
  <Text>Gender</Text>
  <Dropdown
  containerStyle={styles.textInputStyle}
        label='Gender'
        data={genderData}
      />
  </View>
</View>


<View style={styles.rowContainerStyle}>
<View>
  <Text>SIN/SSN</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="SIN/SSN"
        value={this.state.sinNumber}
        onChangeText={(text) => this.setState({sinNumber:text})}
      />
  </View>
<View>
<Text>Driver Licence No</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="Driver Licence No"
        value={this.state.licenceNumber}
        onChangeText={(text) => this.setState({licenceNumber:text})}
      />
  </View>
</View>

<View style={styles.rowContainerStyle}>
<View>
  <Text>Address</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="Address"
        multiline = {true}
         numberOfLines = {4}
         value={this.state.address}
         onChangeText={(text) => this.setState({address:text})}
      />
      </View>

      <View>
  <Text>About you</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="About"
        multiline = {true}
         numberOfLines = {4}
         value={this.state.aboutYou}
         onChangeText={(text) => this.setState({aboutYou:text})}
      />
      </View>
</View>

<View style={styles.rowContainerStyle}>
<View>
  <Text>Driver Licence Issue Date</Text>
  <DatePicker
        style={{width: width*0.45,marginTop:height*0.03}}
        date={this.state.licenceIssueDate}
        mode="date"
        placeholder="select Issue date"
        format="YYYY-MM-DD"
        minDate="1980-05-01"
        maxDate="2015-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.setState({licenceIssueDate: date})}}
      />
  </View>
  <View>
  <Text>Driver Licence Expiry Date</Text>
  <DatePicker
        style={{width: width*0.45,marginTop:height*0.03}}
         date={this.state.licenceExpiryDate}
        mode="date"
        placeholder="select Expiry date"
        format="YYYY-MM-DD"
        minDate="1980-05-01"
        maxDate="2015-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.setState({licenceExpiryDate: date})}}
      />
  </View>

</View>
{this.state.ExperienceInputView.map((value, index) => {
          return value
        })}
         <Button title='+' onPress={() => this.addTextInput(this.state.ExperienceInputView.length)} />
        
         <View style={styles.rowContainerStyle}>
<View>
  <Text>Experience Image</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.openExperienceImagePicker("experience")}
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.ExperienceImageSource}
/>
    </TouchableOpacity>
    </View>

  </View>
<View>
<Text>Profile Image</Text>
<View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.openExperienceImagePicker("profile")}
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.ProfileImageSource}
/>
    </TouchableOpacity>
    </View>
  </View>
</View>
<View>
<Button
title="Next"
onPress={()=>{this.onSubmitPersonalData()}}
/>

</View>
     </ScrollView>
     </Background>
    )
  }
}

const styles=StyleSheet.create({
  mainContainer:{
    flex:1
  },
container:{
  flex:1,
  margin:10
},
rowContainerStyle:{
  flex:1,
  flexDirection:"row",
  margin:5,
  // alignItems:"center",
  justifyContent:"space-between"
},
textInputStyle:{
width:width*0.37,
paddingLeft:10
},
ImagePickerView:{
  width:width*0.20,
  height:height*0.13,
  borderWidth:1,
  borderRadius:5,
  margin:width*0.03
},
ImagePicker:{
  width:width*0.17,
  height:height* 0.115,
  borderWidth:5,
  borderWidth:1,
  margin:width*0.01,
  flex:1
},
imageView:{
  width:width*0.16,
  height:height*0.114
}
})

const mapStateToProps = state => ({
  // tokenforuser:(state.user.driverData && state.user.driverData.token) || (state.user.userData && state.user.userData.token),
  // modalstate: state.ModalHandleReducer,
  // driverInfo:state.ModalHandleReducer.DriverInfo,
  // userData:state.user.userData,
  // driverData:(state.user && state.user.driverData) || (state.user && state.user.userData),
  // citiesList: state.user.citiesList ,
  // certificatesList:state.user.certificatesList,
  // experienceTypeList : state.user.experienceTypeList,
  // vehicleTypeList : state.user.vehicleTypeList,
  // vehicleMakeList : state.user.vehicleMakeList,
  // vehicleModelList : state.user.vehicleModelList,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);