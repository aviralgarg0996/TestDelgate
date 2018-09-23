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
import Toast, {DURATION} from 'react-native-easy-toast'
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
      vehicleModelData:[],
      yearData:[{value:"2005"},{value:"2006"},{value:"2007"},{value:"2008"},{value:"2009"},{value:"2010"},{value:"2011"},{value:"2012"},{value:"2013"}],
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiICIsImlkIjoiNWJhNTEyYzU0MDVjZmYzMmRjZDk1MmY0Iiwicm9sZSI6IkRSSVZFUiIsImlhdCI6MTUzNzU0OTM5MH0.pm-ny6ruk7lsFlZCCfeHvlNIUhqlDpIGnPB_dL_RmWg",
      vehicleCategory:[],
      selectedVehicleId:"",
      selectedCompanyId:"",
      roomsList:[],
      roomsView:[],
      check:true,
      selectedVehicleType:"",
      selectedVehicleCompany:"",
      selectedVehicleModal:"",
      selectedYear:"",
      LicenceImage:{},
      InsuranceImage:{},
      Background:{},
      DriverExtract:{},
      vehicleImage:{}
    }}
    componentDidMount = () => {
      startLoading();
      this.getToken();
      this.getVehicleTypeData();
      this.getVehicleCompany();
 
    }
    getToken = () =>{
      AsyncStorage.getItem("token").then((value) => {
        this.setState({token:value})
      });
    }

    getVehicleTypeData=()=>{
      this.setState({
        roomsView:[],
        VehicleTypeData:[],
        MakeOfVehicleData:[],
        selectedVehicleCompany:""
      })
      RestClient.get("drivers/getVechicleType",{},this.state.token).then((result) => {
       if(result.status == 1){
        stopLoading();
        this.setState({VehicleTypeData:result.data})
        }
      }).catch(error => {
          alert("error=> "+error)
          dispatch(stopLoading());
      });
    }
getVehicleCompany=(vehicleType)=>{
  this.setState({
    roomsView:[],
    MakeOfVehicleData:[],
    selectedVehicleCompany:vehicleType
  })
  let id=""
  startLoading();
this.state.VehicleTypeData.map((item)=>{
if(item.name==vehicleType)
this.setState({
  selectedVehicleId:item._id
})
})
  RestClient.post("admin/getVehicleCompany",{},this.state.token).then((result) => {
    console.log("result",result)
    if(result.status == 1){
     stopLoading();
     this.setState({MakeOfVehicleData:result.data})
     }
     console.log("ststdtdtdt",this.state.MakeOfVehicleData)
   }).catch(error => {
       console.log("error=> "+error)
       dispatch(stopLoading());
   });
}

    getVehicleModal=(makeOfVehicle)=>{
      this.setState({
        roomsView:[]
      })
      let id=""
      startLoading();
this.state.MakeOfVehicleData.map((item)=>{
  if(item.name==makeOfVehicle)
 {
   this.setState({
     selectedCompanyId:item._id
   })
 }
})
      RestClient.post("admin/getVehicleModel",{vehicle_typeid:this.state.selectedVehicleId,company_id:this.state.selectedCompanyId},this.state.token).then((result) => {
        console.log("result",result)
        if(result.status == 1){
         stopLoading();
         this.setState({vehicleModelData:result.data})
         }
         console.log("ststdtdtdt",this.state.vehicleModelData)
       }).catch(error => {
           console.log("error=> "+error)
           dispatch(stopLoading());
       });
    }

    renderRooms=(modal)=>{
      this.state.vehicleModelData.map((item)=>{
        if(item.name==modal)
        {
          this.setState({
            roomsList:item.room,
            selectedVehicleModal:item._id
          })
          console.log("rooms",this.state.roomsList)
        }
      })
      this.state.roomsList.map((item)=>{
        console.log("rooms",item)
        this.state.roomsView.push(<View style={styles.roomContainer}>
          <Text>{item.name}</Text>
          <TextInput
        style={styles.roomInputStyle}
        placeholder={item.name}
        // value={this.state.vehicleNumber}
       // onChangeText={(text) => this.setState({vehicleNumber:text})}
      />
          </View>)
      })
      console.log("roomsViewarr",this.state.roomsView)
this.setState({check:false})

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
          console.log("response",response)
          let source = { uri: response.uri };
  if(imageType=='vehicle')
          this.setState({
            VehicleImageSource: source,
            vehicleImage:response
          });
          else if(imageType=='licence')
          this.setState({
            licenceImageSource: source,
            LicenceImage:response
          });
          else if(imageType=='insurance')
          this.setState({
            insuranceImageSource: source,
            InsuranceImage:response
          });
          else if(imageType=='background')
          this.setState({
            backgroundCheckSource: source,
            Background:response

          });
          else if(imageType=='driver')
          this.setState({
            driverExtractSource: source,
            DriverExtract:response
          });
        }
      });
    }

    saveVehicleInfo=()=>{
  if(this.state.vehicleNumber=="")
      this.refs.toast.show('Please Enter Vehicle Number!',DURATION.LENGTH_LONG);
// else if(this.state.selectedVehicleType=="")
// this.refs.toast.show('Please Select Vehicle Type!',DURATION.LENGTH_LONG);
// else if(this.state.selectedVehicleCompany=="")
// this.refs.toast.show('Please Select Vehicle Company!',DURATION.LENGTH_LONG);
// else if(this.state.selectedVehicleModal=="")
// this.refs.toast.show('Please Select Vehicle Modal!',DURATION.LENGTH_LONG);
// else if(this.state.selectedYear=="")
// this.refs.toast.show('Please Select Year!',DURATION.LENGTH_LONG);
// else if(this.state.insuranceNumber=="")
// this.refs.toast.show('Please Enter Insurance Number',DURATION.LENGTH_LONG);
// else if(this.state.insuranceExpiryDate=="")
// this.refs.toast.show('Please Select Insurance Expiry Date!',DURATION.LENGTH_LONG);
// else if(this.state.VehicleImageSource=="")
// this.refs.toast.show('Please Upload Vehicle Image!',DURATION.LENGTH_LONG);
// else if(this.state.licenceImageSource=="")
// this.refs.toast.show('Please upload Licence Image!',DURATION.LENGTH_LONG);
// else if(this.state.insuranceImageSource=="")
// this.refs.toast.show('Please upload Insurance Image!',DURATION.LENGTH_LONG);
// else if(this.state.backgroundCheckSource=="")
// this.refs.toast.show('Please Upload Background Check Image!',DURATION.LENGTH_LONG);
// else if(this.state.driverExtractSource=="")
// this.refs.toast.show('Please Upload Driver Extract Image!',DURATION.LENGTH_LONG);
else
{
  this.props.UserActions.userDriverSecondForm({...this.state}).then((resp)=>{
    this.props.navigation.navigate("Success")
alert("Hello"+resp);
  })
  
}

    }
  render() {
    let vehicleTypeList=[]
    this.state.VehicleTypeData!=[] && this.state.VehicleTypeData.map((data,key)=>{
      vehicleTypeList.push({value:data.name,id:data._id})
    })

    let makeOfVehicleList=[]
    this.state.MakeOfVehicleData!=[] && this.state.MakeOfVehicleData.map((data,key)=>{
      makeOfVehicleList.push({value:data.name,id:data._id})
    })

    let vehicleModelList=[]
    this.state.vehicleModelData!=[] && this.state.vehicleModelData.map((data,key)=>{
      console.log("vehicleModal",data)
      vehicleModelList.push({value:data.name,id:data._id})
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
  <Dropdown
  containerStyle={styles.textInputStyle}
  value={this.state.selectedVehicleType}
        label='Vehicle Type'
        data={vehicleTypeList}
        onChangeText={(text)=>this.getVehicleCompany(text)}
      />
  </View>
  <View>
     <Dropdown
  containerStyle={styles.textInputStyle}
        label='Make Of Vehicle'
        data={makeOfVehicleList}
        onChangeText={(text)=>this.getVehicleModal(text)}
        
      />
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View>
  <Dropdown
  containerStyle={styles.textInputStyle}
        label='Model'
        data={vehicleModelList}
        onChangeText={(text)=>this.renderRooms(text)}
        
      />
  </View>
  <View>
  <Dropdown
  onChange={()=>alert("hi")}
  containerStyle={styles.textInputStyle}
        label='Year'
        data={this.state.yearData}
        onChangeText={(text)=>this.setState({selectedYear:text})}
      />
  </View>
 </View>
 <View style={styles.roomContainerStyle}>
{this.state.roomsView.map((value, index) => {
  return value
})}
 </View>
 <Toast
                    ref="toast"
                    style={{backgroundColor:'#D6511F'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />

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
  <Text>Driver Extract Photo       </Text>
 
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
onPress={()=>{this.saveVehicleInfo()}}
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
roomContainer:{
  flex:1,
  flexDirection:"row"
},
rowContainerStyle:{
  flex:1,
  flexDirection:"row",
  margin:5,
  // alignItems:"center",
  justifyContent:"space-between"
},
roomContainerStyle:{
  flex:1,
  flexDirection:"column",
  margin:5,
  alignItems:"flex-start",
  justifyContent:"center"
},
textInputStyle:{
  width:width*0.37,
  paddingLeft:10
  },
  roomInputStyle:{
    paddingLeft:10,
    width:width*0.28,
    marginLeft:10
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