import React, { Component } from 'react'
import {ScrollView,View,Text,StyleSheet,TextInput,Dimensions,Button,TouchableOpacity,Image,AsyncStorage} from "react-native"
import Background from '../../components/common/Background';
import DatePicker from 'react-native-datepicker'
import ImagePicker from "react-native-image-picker";
import { Dropdown } from 'react-native-material-dropdown';
import { bindActionCreators } from "redux";
import RestClient from '../../utilities/RestClient';
import Constants from "../../constants"
import * as UserActions from '../../redux/modules/user';
import { connect } from 'react-redux';
import { asyncLocalStorage } from 'redux-persist/storages';
import { startLoading, stopLoading, showToast, hideToast } from '../../redux/modules/app';
const { height, width } = Dimensions.get('window');
class VehicleInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      vehicleNumber:"",
      insuranceNumber:"",
      insuranceExpiryDate:"",
      VehicleImageSource:"",
      licenceImageSource:"",
      insuranceImageSource:"",
      backgroundCheckSource:"",
      driverExtractSource:"",
      VehicleTypeData:[],
      MakeOfVehicleData:[],
      ModelData:[],
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiICIsImlkIjoiNWJhMjk1YmEzMzUyMTQxMDZjYzk0NTAzIiwicm9sZSI6IkRSSVZFUiIsImlhdCI6MTUzNzQ3MzY4NX0.ZCivOxYb6aHUe0BeUgHF0p2nBCU2wWutBrNNL7ufa3k"
    }}
    componentDidMount = () => {
      startLoading();
      this.getToken();
     

    }
    getToken = () =>{
      AsyncStorage.getItem("token").then((value) => {
        console.log("token1",value)
        this.setState({token:value})
      });
      this.getVehicleTypeData();
    }
    getVehicleTypeData=()=>{
      console.log("token",this.state.token)
      RestClient.get("drivers/getVechicleType",{},this.state.token).then((result) => {
        console.log('result getVehicle ******* ',result)
       if(result.status == 1){
        stopLoading();
        this.setState({VehicleTypeData:result.data})
        }
      }).catch(error => {
          alert("error=> "+error)
          dispatch(stopLoading());
      });
    }
    openImagePicker=(imageType)=>{
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
  if(imageType=='vehicle')
          this.setState({
            VehicleImageSource: source
          });
          else if(imageType=='licence')
          this.setState({
            licenceImageSource: source
          });
          else if(imageType=='insurance')
          this.setState({
            insuranceImageSource: source
          });
          else if(imageType=='background')
          this.setState({
            backgroundCheckSource: source
          });
          else if(imageType=='driver')
          this.setState({
            driverExtractSource: source
          });
        }
      });
    }
  render() {
    let genderData = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Others',
    }];
    let vehicleTypeList=[]
    this.state.VehicleTypeData!=[] && this.state.VehicleTypeData.map((data,key)=>{
      vehicleTypeList.push({value:data.name,id:data._id})
    })
    console.log("vehicleTypeList",vehicleTypeList)
    return (
      <Background style={styles.mainContainer}>
      <ScrollView style={styles.container}>
 <View style={styles.rowContainerStyle}>
 <View>
  <Text>Vehicle Plate Number</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="Vehicle Plate Number"
        value={this.state.vehicleNumber}
        onChangeText={(text) => this.setState({vehicleNumber:text})}
      />
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View>
  <Text>Vehicle Type</Text>
  <Dropdown
  containerStyle={styles.textInputStyle}
        label='Vehicle Type'
        data={vehicleTypeList}
      />
  </View>
  <View>
  <Text>Make Of Vehicle</Text>
  <Dropdown
  containerStyle={styles.textInputStyle}
        label='Make Of Vehicle'
        data={genderData}
      />
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View>
  <Text>Model</Text>
  <Dropdown
  containerStyle={styles.textInputStyle}
        label='Model'
        data={genderData}
      />
  </View>
  <View>
  <Text>Year</Text>
  <Dropdown
  onChange={()=>alert("hi")}
  containerStyle={styles.textInputStyle}
        label='Year'
        data={genderData}
      />
  </View>
 </View>
 <View style={styles.rowContainerStyle}>
<Text>Capacity</Text>
 </View>

 <View style={styles.rowContainerStyle}>
 <View>
  <Text>Insurance Number</Text>
  <TextInput
        style={[styles.textInputStyle,{marginTop:20}]}
        placeholder="Insurance Number"
        value={this.state.insuranceNumber}
        onChangeText={(text) => this.setState({insuranceNumber:text})}
      />
  </View>
  <View>
  <Text>Insurance Expiry Date</Text>
  <DatePicker
        style={{width: width*0.45,marginTop:height*0.03}}
         date={this.state.insuranceExpiryDate}
        mode="date"
        placeholder="select Expiry date"
        format="YYYY-MM-DD"
        minDate="1980-05-01"
        maxDate="2015-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.setState({insuranceExpiryDate: date})}}
      />
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View>
  <Text>Picture Of Vehicle</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.openImagePicker("vehicle")}
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.VehicleImageSource}
/>
    </TouchableOpacity>
    </View>
  </View>
 </View>
<Text style={styles.headerText}>Documents</Text>

<View style={styles.rowContainerStyle}>
 <View>
  <Text>Driver Licence Photo</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.openImagePicker("licence")}
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.licenceImageSource}
/>
    </TouchableOpacity>
    </View>
  </View>

  <View>
  <Text>Vehicle Insurance Photo</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.openImagePicker("insurance")}
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.insuranceImageSource}
/>
    </TouchableOpacity>
    </View>
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View>
  <Text>BackGround Check Photo</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.openImagePicker("background")}
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.backgroundCheckSource}
/>
    </TouchableOpacity>
    </View>
  </View>

  <View>
  <Text>Driver Extract Photo</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.openImagePicker("driver")}
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.driverExtractSource}
/>
    </TouchableOpacity>
    </View>
  </View>
 </View>

<View>
<Button
onPress={()=>{alert("")}}
title="Finish"
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
  },
  headerText:{
    fontSize:22,
    fontWeight:'bold'
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfo);