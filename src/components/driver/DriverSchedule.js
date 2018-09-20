import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Constants from "../../constants";
import OrderButton from '../../components/common/FormSubmitButton';
import { Calendar } from 'react-native-calendars';
import * as ScheduleActions from '../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import moment from 'moment';

class DriverSchedule extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
       // showOrder:orderDates
        startDate:"",
        endDate:"",
        scheduleDatesList: props.scheduleDatesList
    }   
  }
  componentWillReceiveProps(nextProps){
    //console.log('nextProps ******* ',nextProps)
    this.setState({
      scheduleDatesList:nextProps.scheduleDatesList
    })
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  calendorUpdate() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    
    firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");
  
    this.setState({
      startDate:firstDay,
      endDate:lastDay
    },()=>{
        //console.log('isnide componet will mount home ********* ',{...this.state},this.props.tokenforuser) 
        this.props.ScheduleActions.scheduledDateList({...this.state},this.props.tokenforuser);
    })
    
  }
  componentWillMount(){
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    
    firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");
  
    this.setState({
      startDate:firstDay,
      endDate:lastDay
    },()=>{
        //console.log('isnide componet will mount home ********* ',{...this.state},this.props.tokenforuser) 
        this.props.ScheduleActions.scheduledDateList({...this.state},this.props.tokenforuser);
    })
    
  }

  OnDayClicked(dateClicked){
    this.props.navigationProps('Home_ScheduleOrder',{selectedDateObj:dateClicked,refreshCal: this.refreshCalendorFunction})
  }
  refreshCalendorFunction=()=>{
    
    
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    
    firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");
  
    this.setState({
      startDate:firstDay,
      endDate:lastDay
    },()=>{
        //console.log('isnide refreshCalendorFunction ********* ',{...this.state},this.props.tokenforuser) 
        this.props.ScheduleActions.scheduledDateList({...this.state},this.props.tokenforuser);
       // this.forceUpdate();
    })
    
   
  
    
      }

  dayOffScheduleDates(){
    console.log('dayOffScheduleDates')
  }

  availableDayScheduleDates(){
    console.log('availableDayScheduleDates')
  }

  orderScheduleDates(){
    console.log('orderScheduleDates')
  }

  monthChanged(month){
    var date = new Date(month.timestamp)
    y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
        firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");   
    this.setState({
      startDate:firstDay,
      endDate:lastDay
    },()=>{ 
        this.props.ScheduleActions.scheduledDateList({...this.state},this.props.tokenforuser);
        //this.forceUpdate();
    })

  }

  


  render() {
    return (
      <View>
        <View style={{flexDirection:'row'}}>
          <OrderButton 
            text={'Day Off'} 
            style={styles.dayOffButton} 
            textStyle={{color:Constants.Colors.Gray,fontWeight:'400',fontSize:16}}
            onPress={()=>{this.dayOffScheduleDates()}} />
          <OrderButton 
            text={'Availabilty Days'} 
            style={styles.availablilityButton} 
            textStyle={{color:Constants.Colors.LightBlue,fontWeight:'400',fontSize:16}}
            onPress={()=>{this.availableDayScheduleDates()}} />
          <OrderButton 
            text={'Order Scheduled'} 
            style={styles.orderScheduleButton} 
            textStyle={{color:Constants.Colors.Blue,fontWeight:'400',fontSize:16}}
            onPress={()=>{this.orderScheduleDates()}} />
        </View>
        <Calendar
          current={this.props.propSelectedDate}
          pastScrollRange={24}
          futureScrollRange={24}
          //hideArrows={true}
          //disableMonthChange={true}
          //horizontal
          onMonthChange={(month) => {console.log('month changed', month);
            this.monthChanged(month);
          }}
          pagingEnabled
          onDayPress={(day) => {this.OnDayClicked(day)}}
          onDayLongPress={(day) => {this.OnDayClicked(day)}}
          markedDates={this.state.scheduleDatesList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayOffButton:{
    borderColor:Constants.Colors.Black,
    flex:1,
    backgroundColor:'transparent',
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*1.5,
    alignItems:'center',
    justifyContent:'center',
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  availablilityButton:{
    borderColor:Constants.Colors.LightBlue,
    flex:1,
    backgroundColor:'transparent',
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*1.5,
    alignItems:'center',
    justifyContent:'center',
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  orderScheduleButton:{
    borderColor:Constants.Colors.Blue,
    flex:1,
    backgroundColor:'transparent',
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*1.5,
    alignItems:'center',
    justifyContent:'center',
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  }
});


const mapStateToProps = state => ({
  propSelectedDate:state.schedule.scheduleSelectedDate,
  tokenforuser: (state.user.userData && state.user.userData.token) || (state.user.driverData && state.user.driverData.token),
  scheduleDatesList: state.schedule.scheduleDatesList,

});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverSchedule);
