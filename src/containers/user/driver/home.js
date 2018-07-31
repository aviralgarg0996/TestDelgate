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
  ScrollView,
  Modal
} from 'react-native';

//import { Switch } from 'react-native-switch';
import Constants from "../../../constants";
import NavigationBar  from "react-native-navbar";
import OrderHistory from '../../../components/driver/OrderHistory';
import DriverSchedule from '../../../components/driver/DriverSchedule';
//import BarChart from '../../../components/driver/BarChartScreen';
import VideoPlayer from '../../../components/driver/Video';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import { connect } from 'react-redux';
import DriverFormSubmit from '../../../components/driver/DriverFormSubmit';
import DriverFormReject from '../../../components/driver/DriverFormReject';

class Home extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      availabilityStatus:props.driverAvailabilityStatus
    }
    //console.log('props ********* ',props)
  }

  componentWillReceiveProps(nextProps){
    //console.log('nextProps ******* ',nextProps)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus,
    })

      // console.log('next props ***********', nextProps )
      // var date = new Date(), y = date.getFullYear(), m = date.getMonth();
      // var firstDay = new Date(y, m, 1);
      // var lastDay = new Date(y, m + 1, 0);
      
      // firstDay = moment(firstDay).format("YYYY-MM-DD");
      // lastDay = moment(lastDay).format("YYYY-MM-DD");
      // this.setState({
      //   startDate:firstDay,
      //   endDate:lastDay,
      //   scheduleDatesList: nextProps.scheduleDatesList
      //   },()=>{
      //     console.log('isnide componet will mount home ********* ',{...this.state},this.props.tokenforuser) 
      //     this.props.ScheduleActions.scheduledDateList({...this.state},this.props.tokenforuser);
      // })
      //this.forceUpdate()
  }
  // refreshCalendor=()=>{
  //   console.log('refreshCalendor' )

  //  // this.refs.child.calendorUpdate();



  // }
  homeSchedule(){
    
  
    this.props.navigation.navigate('Home_ScheduleOrder',{selectedDateObj:new Date(),refreshCal: this.refreshCalFunction})
    
      }

      refreshCalFunction=()=>{
    
    console.log('refreshCalendor')

    this.child.calendorUpdate();
  
    
      }

  render() {
    const titleConfig = {
      title: "HOME",
      tintColor: "#fff",
      style:{fontSize:18,fontWeight:'600'}
    };
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.container}>
          <NavigationBar
            statusBar={{hidden:true}}
            style={styles.navigationBar}
            title={titleConfig}
            rightButton={
              <View style={styles.rightButtonNav}>
                <TouchableOpacity onPress={()=>navigate('Settings')}>
                <Image source={Constants.Images.user.setting} style={styles.navIcons} resizeMode={'contain'}/>
                </TouchableOpacity>
                  <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
                    <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
                </View>
              </View>
            }
            leftButton={
                <TouchableOpacity onPress={()=>navigate('DrawerOpen')}>
                  <Image source={Constants.Images.user.user} style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} resizeMode={'contain'}/>
                </TouchableOpacity>}
          />

          <ScrollView>
            <View style={styles.sectionHeaders}>
              <Text style={styles.textBlue}>Order History</Text>
              <TouchableOpacity onPress={()=>navigate('Orders')}>
                <Text style={[styles.textOrange,{textDecorationLine:'underline'}]}>View all Orders</Text>
              </TouchableOpacity>
            </View>

            <OrderHistory />

            <View style={styles.sectionHeaders}>
              <Text style={styles.textBlue}>Your Schedule</Text>
              <TouchableOpacity onPress={()=>{this.homeSchedule()}}>
                <Text style={[styles.textOrange,{textDecorationLine:'underline'}]}>Scheduled Orders</Text>
              </TouchableOpacity>
            </View>

            <DriverSchedule   onRef={ref => (this.child = ref)}   navigationProps={navigate}/>

            {/* <View style={styles.sectionHeaders}>
            <Text style={styles.textBlue}>Reports</Text>
            <TouchableOpacity onPress={()=>navigate('Home_ScheduleOrder')}>
            <Text style={[styles.textOrange,{textDecorationLine:'underline'}]}>More Reports</Text>
            </TouchableOpacity>
            </View> */}
            {/*<BarChart barStyle={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40}} />
            <View style={styles.reportSection}>
            <Text style={styles.textBlue}>Training</Text>
            </View>*/}

            <View style={styles.sectionHeaders}>
              <Text style={styles.textBlue}>Training</Text>
            </View>

            <VideoPlayer videoStyle={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40, margin:10}} />
            {this.props.userData && this.props.userData.data.driverStatus == 'pending' &&
              <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.FormSubmitModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'FORMSUBMIT_VISIBILITY',visibility:false})}}>
                <DriverFormSubmit navigation={this.props.navigation} dispatch={this.props.navigation} />
              </Modal>
            }
            {this.props.userData && this.props.userData.data.driverStatus == 'rejected' &&
              <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.FormRejectModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'FORMREJECT_VISIBILITY',visibility:false})}}>
                <DriverFormReject navigation={this.props.navigation} dispatch={this.props.navigation} />
              </Modal>
            }
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
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7
  },
  sectionHeaders:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:Constants.BaseStyle.PADDING * .5,
    alignItems:'center'
  },
  textBlue:{
    fontSize:22,
    fontWeight:'700',
    color:Constants.Colors.Blue
  },
  textOrange:{
    fontSize:16,
    fontWeight:'600',
    color:Constants.Colors.Orange
  },
  reportSection:{
    padding:Constants.BaseStyle.PADDING * .5
  },
});

const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  //scheduleDatesList: state.schedule.scheduleDatesList,
});

// const mapDispatchToProps = dispatch => ({
//   UserActions: bindActionCreators(UserActions, dispatch)
// });

export default connect(mapStateToProps, null)(Home);