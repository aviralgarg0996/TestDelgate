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
  ScrollView,
} from 'react-native';
import Constants from "../../../constants";
import NavigationBar  from "react-native-navbar";
import Calendar from '../../../components/common/CalendarStrip';
import FormTextInput from "../../../components/common/FormTextInput";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Maps from '../../../components/common/Map';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import LabelSelect from '../../../components/common/LabelSelect';
import * as OrderActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';


class ManageScheduleWorkingHours extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      availabilityStatus:props.driverAvailabilityStatus,
      setDefault :false,
      hasExtraHelper:false,
      fromTime: "",
      toTime:'',
      scheduleDate:moment(this.props.navigation.state.params.dateSelected).toISOString(),
      markerLatLng:[],
      cities:props.citiesList,
      citiesList:props.citiesList,
      // cityArray:[{
      //   name: 'Panchkula',
      //   isSelected: true,
      //   value: 1,
      //   coordinates: {
      //     latitude: 30.695573651593037,
      //     longitude:76.86047809632487
      //   },
      //   radius: 10000,
      // }, {
      //   name: 'Chandigarh',
      //   isSelected: false,
      //   value: 2,
      //   coordinates: {
      //     latitude: 30.732469143794265,
      //     longitude:76.77825229676432
      //   },
      //   radius: 10000,
      // }, {
      //   name: 'Kharar',
      //   isSelected: false,
      //   value: 3,
      //   coordinates: {
      //     latitude: 30.753092749061906,
      //     longitude:76.64520390312498
      //   },
      //   radius:10000
      // }, {
      //   name: 'Zirkpur',
      //   isSelected: false,
      //   value: 4,
      //   coordinates: {
      //     latitude: 30.649181186565354,
      //     longitude:76.82647831718748
      //   },
      //   radius:10000
      // }, {
      //   name: 'Derabassi',
      //   isSelected: false,
      //   value: 5,
      //   coordinates: {
      //     latitude:30.604275712551637,
      //     longitude:76.84913761894529
      //   },
      //   radius:10000
      // }]

    }

    //console.log('***** data fetched ******* ',this.props.listOfSchedule)
  }


  componentWillReceiveProps(nextProps){
    //console.log('nextProps ******* ',nextProps)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus
    })
  }


  componentWillMount(){
    this.getMapLatLng()


    this.props.OrderActions.getCitiesList(this.props.tokenforuser)



  }
  componentDidMount(){

    if( this.props.driverData && this.props.driverData.data  && this.props.driverData.data.cities.length !=0){
      console.log("add scheduled cities list",this.props.driverData.data.cities)
      for(let index in this.props.driverData.data.cities){
        let selectData= this.props.driverData.data.cities[index];
  
        for(let inerindex in this.state.citiesList){
          let activeData= this.state.citiesList[inerindex];
          if(selectData.cityName == activeData.cityName){
            this.state.citiesList[inerindex].isSelected = true;
         
          }
        }
      }
  
    }
    this.state.markerLatLng.length =0;
    for(let index in this.state.citiesList){
      let activeData= this.state.citiesList[index];
    
      if(activeData.isSelected){
        this.state.markerLatLng.push(activeData)
      }
    }



  }

  getMapLatLng(){
   

   // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
    //let citiesSelected=[];
    this.state.markerLatLng.length =0;
    for(let index in this.state.citiesList){
      let activeData=this.state.citiesList[index];
      console.log("component will",activeData)

      if(activeData.isSelected){
        this.state.markerLatLng.push(activeData)
      }
    }
    console.log("marker component   array",this.state.markerLatLng)
  }

  getDateSelected(date){
    //console.log(moment(date).toISOString())
    this.setState({scheduleDate:moment(date).toISOString()},()=>{
      //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.scheduleDate);
    })
  }

  saveScheduleHours(){
    if(this.state.fromTime!='' && this.state.toTime!=""){
      let initialdate = moment(this.state.scheduleDate).format("YYYY-MM-DD");
      
      let start_time =this.state.fromTime;
      let fromTimeSelected= moment(initialdate + " " + start_time).toISOString();

      let end_time =this.state.toTime;
      let ToTimeSelected= moment(initialdate + " " + end_time).toISOString();
      console.log(fromTimeSelected);
      console.log(ToTimeSelected);

      if((moment(ToTimeSelected).isSameOrAfter(fromTimeSelected))){
            // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
          // let citiesSelected=[];
          // for(let index in this.state.citiesList){
          //   let activeData=this.state.citiesList[index];
          //   if(activeData.isSelected){
          //     citiesSelected.push(activeData.name)
          //   }
          // }
          console.log("cities data",this.state.cities)

          if(this.state.markerLatLng!=null){
            let sendData={
              radius:5,
              location:this.state.markerLatLng,
              sDate:fromTimeSelected,
              eDate:ToTimeSelected,
              defaultScheduleAll:this.state.setDefault,
              helper:this.state.hasExtraHelper
            }
            this.props.OrderActions.addSchedule(sendData,this.props.tokenforuser)
           // this.props.navigation.navigate('ManageSchedule', {ManageScheduleWorkingHours: this});
          // this.props.navigation.state.params.refresh();
          }
          else{
            alert('Please enter city')
          }
      }
      else{
        alert('Please enter valid time')
      }
    }
    else{
      alert('Please enter time')
    }
  }

  checkForMergeSchedule(){
    
  }

  toggleCheckBoxes(checkBoxName){
    switch(checkBoxName){
      case 'Default':
      this.setState({setDefault:!this.state.setDefault})
      break;
      case 'Helper':
      this.setState({hasExtraHelper:!this.state.hasExtraHelper})
      break;
    }
  }


  renderCheckBoxView(){
    return(
        <View>
           <TouchableOpacity onPress={()=> this.toggleCheckBoxes('Default')} style={styles.checkBoxView}>
                  <Image source={this.state.setDefault ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[styles.checkboxIcon]} resizeMode={'contain'} />
                  <Text style={[styles.checkboxText]}>{'Set to default'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.toggleCheckBoxes('Helper')} style={styles.checkBoxView}>
                  <Image source={this.state.hasExtraHelper ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={styles.checkboxIcon} resizeMode={'contain'} />
                  <Text style={[styles.checkboxText]}>{'Has an extra helped'}</Text>
            </TouchableOpacity>
        </View>
    )
  }

  renderHoursView(){
    return(
        <View style={{flexDirection:'row', marginTop:10}}>
        {/* alignItems:'flex-start',justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5 */}
          <View  style={{flex :.35,alignItems:'center',justifyContent:'center'}}>
            <Text  style={{color:Constants.Colors.Blue,fontSize:14,fontWeight:'700',textAlign:'left'}}>{'WORKING HOURS'}</Text>
          </View>

          <View style={{flexDirection:'row',flex:.65,justifyContent:'flex-end',alignItems:'center'}}>
                <DatePicker
                style={{width:Constants.BaseStyle.DEVICE_WIDTH * .25}}
                placeholder={'From\r\nhhmm'}
                date={this.state.fromTime}
                mode="time"
                format="HH:mm"
                is24Hour={true}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={Constants.Images.driver.clock}
                //minuteInterval={10}
                onDateChange={(fromTime) => {this.setState({fromTime: fromTime});}}
                customStyles={{
                  dateIcon: {width: 20,height: 20,marginLeft: 5,marginRight: 5},
                  dateInput:{borderColor:Constants.Colors.Transparent,borderBottomColor:Constants.Colors.Blue},
                  placeholderText:{color:Constants.Colors.Blue,fontSize:12},
                  dateText:{color:Constants.Colors.Blue,fontSize:12},
                  // ... You can check the source to find the other keys.
                  }}
              />
              <DatePicker
                style={{width:Constants.BaseStyle.DEVICE_WIDTH * .25,marginLeft:10}}
                placeholder={'To\r\nhhmm'}
                date={this.state.toTime}
                mode="time"
                format="HH:mm"
                is24Hour={true}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={Constants.Images.driver.clock}
                //minuteInterval={10}
                onDateChange={(toTime) => {this.setState({toTime: toTime});}}
                customStyles={{
                  dateIcon: {width: 20,height: 20,marginLeft: 5,marginRight: 5},
                  dateInput:{borderColor:Constants.Colors.Transparent,borderBottomColor:Constants.Colors.Blue},
                  placeholderText:{color:Constants.Colors.Blue,fontSize:12},
                  dateText:{color:Constants.Colors.Blue,fontSize:12},
                  // ... You can check the source to find the other keys.
                  }}
              />
            </View>
        </View>
    )
  }

  selectConfirm=(list) =>{
    let {citiesList} = this.state;

   // this.setState({markerLatLng:[]});
    for (let item of list) {
      let index = citiesList.findIndex(ele => ele === item);
      if (~index) citiesList[index].isSelected = true;
      else continue;
    }
    this.setState({citiesList: citiesList});

   // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
    //let citiesSelected=[];
    this.state.markerLatLng.length =0;
    for(let index in this.state.citiesList){
      let activeData= this.state.citiesList[index];
      console.log("marker active data",activeData)

      if(activeData.isSelected){
        this.state.markerLatLng.push(activeData)
      }
    }
    // console.log("cities  add **************",this.state.citiesList)
    // this.setState({citiesList: citiesList},()=>{
    //   this.setState({cities:this.state.citiesList});
    //   console.log("cities new add **************",this.state.cities)
    // });





  }

  deleteItem=(item)=> {
   // this.setState({markerLatLng:[]});
    let {citiesList} = this.state;
    let index = citiesList.findIndex(a => a === item);
    this.state.citiesList[index].isSelected = false;
    this.setState({citiesList: citiesList});


   // let cityArr=JSON.parse(JSON.stringify(this.state.cityArray))
    this.state.markerLatLng.length =0;
    for(let index in this.state.citiesList){
      let activeData=this.state.citiesList[index];
      console.log("marker active data",activeData)

      if(activeData.isSelected){
        this.state.markerLatLng.push(activeData)
      }
    }



    // console.log("cities  add **************",this.state.citiesList)
    // this.setState({citiesList: citiesList},()=>{
    //   this.setState({cities:this.state.citiesList});
    //   console.log("cities new add **************",this.state.cities)
    // });

  }

  renderServingArea(){
    return(
      <View style={{margin:10}}>
        <View >
            <Text style={{color:Constants.Colors.Blue,fontSize:14,fontWeight:'700',textAlign:'left'}}>{'SERVING AREA'}</Text>
        </View>

        <View>
          <LabelSelect
            title="Select Cities"
            ref="select"
            style={styles.labelSelect}
            onConfirm={this.selectConfirm}
          >
            {this.state.citiesList.filter(item => item.isSelected).map((item, index) =>
              <LabelSelect.Label
                key={'label-' + index}
                data={item}
                onCancel={() => {this.deleteItem(item);}}
              >{item.cityName}</LabelSelect.Label>
            )}
            {this.state.citiesList.filter(item => !item.isSelected).map((item, index) =>
              <LabelSelect.ModalItem
                key={'modal-item-' + index}
                data={item}
              >{item.cityName}</LabelSelect.ModalItem>
            )}
          </LabelSelect>
        </View>

    </View>
    )
  }

  renderBottomButtons(){
    const { goBack } = this.props.navigation;
    return(
      <View style={[{flexDirection:'row',marginBottom:10}]}>
              <View style={[{flex : 0.5}]}>
                <SubmitButton
                  onPress={() => this.saveScheduleHours()}
                  text={'SAVE CHANGES'}
                  style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
              <View style={[{flex : 0.5}]}>
                <SubmitButton
                  onPress={() => goBack()}
                  text={'CANCEL'}
                  style={[styles.ButtonStyle]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
        </View>
    )
  }

  render() {
    const titleConfig = {
      title: "MANAGE SCHEDULE",
      tintColor: "#fff",
      style:{fontSize:18,fontWeight:'600'}
    };


    const { navigate, goBack } = this.props.navigation;
    console.log("marker array default length",this.state.markerLatLng.length)
    console.log("marker length",this.props.citiesList)
    return (
      
      <View style={styles.container}>
        <NavigationBar
          statusBar={{hidden:true}}
          style={styles.navigationBar}
          title={titleConfig}
          rightButton={
            <View style={styles.rightButtonNav}>
              <TouchableOpacity>
                <Image
                  source={Constants.Images.user.setting}
                  style={styles.navIcons} resizeMode={'contain'}/>
              </TouchableOpacity>
              <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
              <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
              </View>
            </View>
          }
          leftButton={
            <TouchableOpacity onPress={()=>{
             
            goBack()}}>
            <Image source={Constants.Images.driver.back} style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2,tintColor:Constants.Colors.White}]} resizeMode={'contain'}/>
            </TouchableOpacity>
          }
        />

         <Calendar getDateSelected={this.getDateSelected.bind(this)} currentDate={this.state.scheduleDate}/>
        
          <ScrollView>

              {this.renderHoursView()}

              {this.renderServingArea()}
              
              {this.state.markerLatLng.length!= 0? 
                
                <Maps showMarkers={true} markers={this.state.markerLatLng}/>
                
                :
                null
              }

              <View style={{flex:1, marginTop:10}}>
                  {this.renderCheckBoxView()}

                  {this.renderBottomButtons()}
              </View>

          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor:Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    alignItems:'center'
  },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center'
  },
  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 6
  },
  // btCloseModal:{
	// 		width: 40,
	// 		height:40,
	// 		borderRadius:40,
  //     backgroundColor:Constants.Colors.Orange,

	// },
  // btnCloseModalIcon:{
	// 	width:20,
	// 	height:20,
  //   margin:10,
  //   tintColor:'white',
	// },
  inputTextViewStyle: {
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/200*1,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/200,
  },
  inputStyle: {
    fontSize:14,
    padding:0,
  },
  ButtonStyle: {
    borderWidth: 0,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,
    borderRadius:5,
    paddingLeft : 3,
    paddingRight : 3,
  },
  checkBoxView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },
  checkboxIcon:{
    width:10,
    height:10,
    marginRight:5,
  },
  checkboxText:{
    color:Constants.Colors.Blue,
    fontSize:12,
    fontWeight:"900",
  },
  clockView:{
    flexDirection:'row',
    marginRight:10,
    borderBottomWidth: 1,
    borderBottomColor:Constants.Colors.Blue,
  },
  clockIcon:{
    width:10,
    height:10,
    marginTop:18,
    marginLeft:5,
  },
  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: Constants.Colors.Blue
  },
});


const mapStateToProps = state => ({
  //tokenforuser:state.user.userData.token,
  tokenforuser:(state.user.driverData && state.user.driverData.token) || (state.user.userData && state.user.userData.token),
  //listOfSchedule:state.schedule.scheduleList,
  driverData:(state.user && state.user.driverData) || (state.user && state.user.userData),
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  citiesList: state.schedule.citiesList
});

const mapDispatchToProps = dispatch => ({
  OrderActions: bindActionCreators(OrderActions, dispatch)
  
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageScheduleWorkingHours);
