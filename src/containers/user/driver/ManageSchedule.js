/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import Constants from "../../../constants";
import NavigationBar  from "react-native-navbar";
import Calendar from '../../../components/common/CalendarStrip';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as ScheduleActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import moment from 'moment';
import SetDayOff from '../../../components/driver/SetDayOff';

class ManageSchedule extends Component<{}> {
  constructor(props){
    super(props);
    //let displayDate=props.propSelectedDate
    // if(props.navigation.state.params != null && props.navigation.state.params.DateFromLink){
    //   displayDate= new Date();
    // }

    this.state={
      availabilityStatus:props.driverAvailabilityStatus,
      setDayOff:false,
      dateSelected:new Date(props.navigation.state.params.selectedDate),
      ScheduleListData:props.listOfSchedule || [],
      setDayOffModalVisible:false
    }

  }

  // componentWillUpdate(nextProps,nextState){
  //   console.log('nextProps manage schedule ******* ',nextProps, this.props, nextState)
    
  //   // this.setState({
  //   //   ScheduleListData: nextProps.listOfSchedule
  //   // })
  // }

  componentWillReceiveProps(nextProps){
    console.log('nextProps manage schedule ******* ',nextProps, this.props)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus,
      ScheduleListData: nextProps.listOfSchedule
    })
    //this.forceUpdate();
    //this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
  }


  /***** set day off value managed ****/
  SetDayOnOffModalVisible(val){
    //console.log('value ************* ',val)
    this.setState({
      setDayOffModalVisible:val
    })
    // this.setState({
    //   setDayOff:!this.state.setDayOff
    // },()=>{
    //   if(this.state.setDayOff){
    //     this.props.ScheduleActions.setDayOFF({...this.state},this.props.tokenforuser);
    //   }else{
    //     this.props.ScheduleActions.setDayOn({...this.state},this.props.tokenforuser);
    //   }
    // })
  }
  

  setDayToGoOff(){
    //working to day off i.e setDayOff is false here
    this.setState({setDayOff:true,setDayOffModalVisible:false},()=>{
      this.props.ScheduleActions.setDayOFF({...this.state},this.props.tokenforuser);
    })
  }

  setDayToGoOn(){
    //off to day working i.e setDayOff is true here
    this.setState({setDayOff:false,setDayOffModalVisible:false},()=>{
      this.props.ScheduleActions.setDayOn({...this.state},this.props.tokenforuser);
    })
  }

  /*** get selected date ***/
  getDateSelected(date){
    //console.log('date selected ********* ',date)
    this.setState({
      dateSelected:moment(date._d).format('YYYY-MM-DD')
    },()=>{
      //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.dateSelected);
      this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    })
  }

  componentDidMount(){
    this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    //this.forceUpdate();
  }


  goToManageHourSchedule(){
    this.props.navigation.navigate("ManageScheduleWorkingHours",{dateSelected:this.state.dateSelected,refresh: this.refreshFunction})
  }

  refreshFunction=()=>{
    console.log('refreshed ************ ')
    this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    this.forceUpdate();
  }

  render() {
    const titleConfig = {
      title: "MANAGE SCHEDULE",
      tintColor: "#fff",
      style:{fontSize:18,fontWeight:'600'}
    };

    let displayDateOnScreen=moment(this.state.dateSelected).format('MMMM DD, YYYY')


    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
      <NavigationBar
        statusBar={{hidden:true}}
        style={styles.navigationBar}
        title={titleConfig}
        rightButton={
          <View style={styles.rightButtonNav}>
            <TouchableOpacity onPress={()=>navigate('Settings')}>
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
          <TouchableOpacity onPress={()=>goBack()}>
            <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
          </TouchableOpacity>
        }
      />

        <Calendar getDateSelected={this.getDateSelected.bind(this)} currentDate={this.state.dateSelected}/>

        <View style={[styles.ordersList,{flexDirection:'row',borderTopWidth:2,borderTopColor:Constants.Colors.LightBlue}]}>
          <View  style={{alignItems:'center',justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
              <Text  style={{fontSize:14,fontWeight:'700',textAlign:'left',color:Constants.Colors.LightBlue}}>{displayDateOnScreen}</Text>
          </View>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.SetDayOnOffModalVisible(true)}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
              <Image source={this.state.setDayOff ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[{width:10, height:10,marginRight:5}]} resizeMode={'contain'} />
              <Text style={[{color:Constants.Colors.Blue,fontSize:12,fontWeight:"900"}]}>{'Set day off'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.renderContent()}

        {this.renderModal()}

        <View style={{flex:1,alignItems:'flex-end',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
          <TouchableOpacity underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {this.goToManageHourSchedule()}}>
            <Image source={Constants.Images.driver.circleplus} style={[styles.btnCloseModalIcon]}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  ScheduleList(item){
    console.log('items *********** ',item)
    let startTime=moment(item.startTime).format("hh:mm");
    let endTime=moment(item.endTime).format("hh:mm");
    let cities=item.location.join()
    return(
      <View style={[styles.ordersList,{justifyContent:'space-around'}]}>
        <View style={{flex:.25,alignItems:'center',justifyContent:'center'}}><Text style={styles.id}>{startTime}{` to `}{endTime}</Text></View>
        
        <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}><Text style={styles.price}>{cities}</Text></View>
        
        <View style={{flex:.25,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
          <TouchableOpacity>
            <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.deleteSchedule(item._id,item.startDate)}}>
            <IconMat name="delete" size={30} color={Constants.Colors.LightGray}/>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }

  deleteSchedule(id,date){
    let sendObj={
      id:id,
		  date:date,
    }
    this.props.ScheduleActions.deleteSchedule(sendObj,this.props.tokenforuser);
  }

  renderContent(){
    if(this.state.ScheduleListData.length == 0){
        if(!this.state.setDayOff){
          return(
            <View style={{alignItems:'center',justifyContent:'center',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*30/100}}>
              <Text  style={{fontSize:16,fontWeight:'700',textAlign:'center',alignItems:'center',justifyContent:'center'}}>{'No Schedule Available!!\r\nGo ahead and manage\r\navailable slots.'}</Text>
            </View>
          )
        }
        else{
          return(
            <View style={{alignItems:'center',justifyContent:'center',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*30/100}}>
              <Text  style={{fontSize:18,fontWeight:'700',textAlign:'center',alignItems:'center',justifyContent:'center',color:Constants.Colors.LightBlue}}>{'You are off today.'}</Text>
            </View>
          )
        }
    }
    else{
      return (
        <FlatList
          data={this.state.ScheduleListData}
          extraData={this.state.ScheduleListData}
          renderItem={({item})=>this.ScheduleList(item)}
        />
      );
    }
  }

  renderModal(){
    return(
      <Modal animationType={"fade"} transparent={true} visible={this.state.setDayOffModalVisible} onRequestClose={() => {this.setState({setDayOffModalVisible:false})}}>
            <SetDayOff navigationProps={this.props} 
            IsOff={this.state.setDayOff} 
            setDayToGoOff={()=>{this.setDayToGoOff()}} 
            setDayToGoOn={()=>{this.setDayToGoOn()}}
            SetDayOnOffModalVisible={(val)=>{this.SetDayOnOffModalVisible(val)}}/>
        </Modal>
    )
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
  btCloseModal:{
			width: 40,
			height:40,
			borderRadius:40,
      backgroundColor:Constants.Colors.Orange,

	},
  btnCloseModalIcon:{
		width:20,
		height:20,
    margin:10,
    tintColor:'white',
  },
  ordersList: {
    padding:Constants.BaseStyle.PADDING * 1.2,
    borderBottomWidth:1,
    borderBottomColor:Constants.Colors.BlurGrey,
    backgroundColor:Constants.Colors.White,
    flexDirection:'row'
  },
  id: {
    color:Constants.Colors.Blue,
    fontWeight:'700',
    fontSize:18
  },
  price: {
    flex:1,
    color:Constants.Colors.Blue,
    fontWeight:'800',
    fontSize:20,
    textAlign:'center'
  },
  status: {
    flex:2,
    fontWeight:'600',
    fontSize:20,
    textAlign:'right'
  }


});

const mapStateToProps = state => (
  {
  //tokenforuser:state.user.userData.token,
  tokenforuser: (state.user.driverData != null) ? state.user.driverData.token : state.user.userData.token,
  listOfSchedule:state.schedule.scheduleList,
  propSelectedDate:state.schedule.scheduleSelectedDate,
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
