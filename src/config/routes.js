import { TabNavigator,StackNavigator ,DrawerNavigator} from "react-navigation";
import MainScreen from "../containers/user/MainScreen";
import Login from "../containers/user/driver/Login";
import Register from "../containers/user/driver/Register";
import Home from "../containers/user/driver/home";

import NewUser from "../components/driver/NewUser";

//import EmailVerification from "../containers/user/driver/EmailVerification";
//import ForgotPassword from "../containers/user/driver/ForgotPassword";
import Orders from "../containers/user/driver/Orders";
import Messages from "../containers/user/driver/Messages";
import Notification from "../containers/user/driver/Notification";
// import DriverForm from "../containers/user/driver/DriverForm";
import DriverForm from "../screens/driverform/UpdDriverForm"
import Followers from "../containers/user/driver/Followers";
import RatingReviews from "../containers/user/driver/RatingReviews";
import ManageSchedule from "../containers/user/driver/ManageSchedule";
import ManageScheduleTime from "../containers/user/driver/ManageScheduleTime";
import ManageScheduleWorkingHours from "../containers/user/driver/ManageScheduleWorkingHours";
import Home_ScheduleOrder from '../components/driver/Home_ScheduleOrder';
import Chat from '../components/chat/Chat';
import MessagesList from '../components/chat/MessagesList';
import Loader from "../components/common/Loader";
import AvailableOrders from '../components/driver/AvailableOrders';
import OnGoing from '../components/driver/OnGoing';
import Orders_ScheduledOrder from '../components/driver/Orders_ScheduledOrder';
import OrderDelivered from '../components/driver/OrderDelivered';
import Scheduled from "../containers/user/driver/Scheduled";
import DeliveryDetails from "../components/driver/DeliveryDetails";
import ProfileDrawer from "../containers/user/driver/ProfileDrawer";
import Settings from "../containers/user/driver/Settings";
import ChangePassword from "../containers/user/driver/ChangePassword";
import DelgateSupport from "../containers/user/driver/DelgateSupport";
import Miscellaneous from "../containers/user/driver/Miscellaneous";
import PaymentSettings from "../containers/user/driver/PaymentSettings";
import PaymentHistory from "../containers/user/driver/PaymentHistory";
import NotificationSettings from "../containers/user/driver/NotificationSettings";
import ServingArea from "../containers/user/driver/ServingArea";
import AppIntroduction from "../containers/user/driver/AppIntroduction";
import SplashScreen from "../containers/user/driver/SplashScreen";
import LandingScreen from "../containers/user/driver/LandingScreen";

import { Image, StyleSheet, Platform } from 'react-native';
import Constants from "../constants";
import React, { Component } from 'react';

// customer routes
import CustomerHome from "../containers/user/customer/home";
import HourlyGetEstimate from "../containers/user/customer/HourlyGetEstimate";
import CustomerOrders from "../containers/user/customer/orders";
import CustomerMessages from "../containers/user/customer/messages";
import CustomerNotifications from "../containers/user/customer/notifications";
import CustomerProfileDrawer from "../containers/user/customer/CustomerProfileDrawer";
import Home_SelectDriver from "../containers/user/customer/Home_SelectDriver";
import Home_PaymentProceed from "../containers/user/customer/Home_PaymentProceed";
import Hourly_PaymentProceed from "../containers/user/customer/Hourly_PaymentProceed";
import Home_Food from "../containers/user/customer/Home_Food";

import Home_Services from "../containers/user/customer/Home_ServicesItemsFood";
import Home_ServicesDoc from "../containers/user/customer/Home_ServicesItemsDoc";
import Home_ServicesItemsCourier from "../containers/user/customer/Home_ServicesItemsCourier";
import Home_ServicesItemsFurniture from "../containers/user/customer/Home_ServicesItemsFurniture";

import Home_DocumentInvoice from "../containers/user/customer/Home_DocumentInvoice";
import Home_CourierInvoice from "../containers/user/customer/Home_CourierInvoice";
import Home_FurnitureInvoice from "../containers/user/customer/Home_FurnitureInvoice";
import UrgencyForFood from "../containers/user/customer/UrgencyForFood";
import UrgencyForDoc from "../containers/user/customer/UrgencyForDoc";
import UrgencyForCourier from "../containers/user/customer/UrgencyForCourier";
import UrgencyForFurniture from "../containers/user/customer/UrgencyForFurniture";
import Home_Invoice from "../containers/user/customer/Home_Invoice";
import Hourly_Invoice from "../containers/user/customer/Hourly_Invoice";

import Orders_Pending from "../containers/user/customer/Orders_Pending";
import Orders_OnGoing from "../containers/user/customer/Orders_OnGoing";
import Orders_Scheduled from "../containers/user/customer/Orders_Scheduled";

// export list of routes.
export default routes = {
    Loader : { screen: Loader },
    Login : { screen: Login },
    MainScreen : { screen: MainScreen },
    Register : { screen: Register },
    DriverForm : {screen : DriverForm},
    Followers : {screen : Followers},
    RatingReviews : {screen : RatingReviews},
    ManageScheduleTime : {screen : ManageScheduleTime},
    ManageScheduleWorkingHours : {screen : ManageScheduleWorkingHours},

    NewUser : {screen : NewUser},

    OnGoing :{screen : OnGoing},
    Settings : { screen: Settings },
    Scheduled : {screen : Scheduled},
    DeliveryDetails : {screen : DeliveryDetails},

    ChangePassword: { screen: ChangePassword },
    DelgateSupport: { screen: DelgateSupport },
    Miscellaneous: { screen: Miscellaneous },
    PaymentSettings: { screen: PaymentSettings },
    PaymentHistory: { screen: PaymentHistory },
    NotificationSettings: { screen: NotificationSettings },
    ServingArea: { screen: ServingArea },
    AppIntroduction: { screen: AppIntroduction},
    SplashScreen: {screen: SplashScreen},
    LandingScreen:{screen:LandingScreen},

//
profile: { screen:DrawerNavigator({
        Home: {
        	screen: TabNavigator({
          		Home: {
          			screen: StackNavigator({
                  Home:{screen : Home},
                  Home_ScheduleOrder:{screen : Home_ScheduleOrder},
                  ManageSchedule : {screen : ManageSchedule},
                },{headerMode: "none",}),
            		navigationOptions: ({ navigation }) => ({
            			title: 'Home',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.driver.home} style={[styles.icon,{tintColor}]} />
            			},
            		}),
          		},
          		Orders: {
                screen: StackNavigator({
                  Orders:{screen: Orders},
                  AvailableOrders :{screen : AvailableOrders},
                  Orders_ScheduledOrder : {screen : Orders_ScheduledOrder},
                  OnGoing : {screen : OnGoing},
                  OrderDelivered : {screen : OrderDelivered},
                },{headerMode: "none",}),
            		navigationOptions: ({ navigation }) => ({
            			title: 'Orders',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.driver.taxi} style={[styles.icon,{tintColor}]}/>
            			},
            		}),
          		},
          		Messages: {
            		screen: StackNavigator({
                  Messages:{screen : Messages},
                  MessagesList:{screen : MessagesList},
                  Chat : {screen : Chat},
                },{headerMode: "none",}),
            		navigationOptions: ({ navigation }) => ({
            			title: 'Messages',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.driver.message} style={[styles.icon,{tintColor}]}/>
            			},
            		}),
          		},
          		Notification: {
            		screen: Notification,
            		navigationOptions: ({ navigation }) => ({
            			title: 'Notifications',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.driver.notification} style={[styles.icon,{tintColor}]}/>
            			},
            		}),
          		},
        	},{tabBarOptions: {
            //upperCaseLabel:false,
            //labelStyle: {
              //fontSize: Constants.BaseStyle.DEVICE_WIDTH <= 360 ? 8 : 12
            //},
                      showIcon: true,
                      //showLabel: Platform.OS === 'ios' ? true : false,
                      activeTintColor:Constants.Colors.LightBlue,
                      inactiveTintColor : Constants.Colors.Gray,
                      style: {
                        width: Constants.BaseStyle.DEVICE_WIDTH,
                        backgroundColor: Constants.Colors.White,
                      },
                      indicatorStyle: {
                        backgroundColor: Constants.Colors.LightBlue,

                      }
                    },
            tabBarPosition: 'bottom'}),
        	navigationOptions: ({ navigation }) => ({
          		title: 'Home',
        	}),
      	},

      }, {
    contentComponent: ProfileDrawer,
    mode: 'modal',
    headerMode: 'none',
    drawerWidth: Constants.BaseStyle.DEVICE_WIDTH /100*85,
  }
) },

customerprofile: { screen: DrawerNavigator({
        CustomerHome: {
        	screen: TabNavigator({
          		CustomerHome: {
          			screen: StackNavigator({
                  CustomerHome:{screen : CustomerHome},
                  Home_Food : {screen : Home_Food},
                  Home_Services : {screen : Home_Services},
                  UrgencyForFood : {screen : UrgencyForFood},
                  UrgencyForDoc : {screen : UrgencyForDoc},
                  UrgencyForCourier : {screen : UrgencyForCourier},
                  UrgencyForFurniture : {screen : UrgencyForFurniture},
                  Home_ServicesDoc : {screen : Home_ServicesDoc},
                  Home_ServicesItemsCourier : {screen : Home_ServicesItemsCourier},
                  Home_ServicesItemsFurniture : {screen : Home_ServicesItemsFurniture},
                  Home_DocumentInvoice : {screen : Home_DocumentInvoice},
                  Home_CourierInvoice : {screen : Home_CourierInvoice},
                  Home_FurnitureInvoice : {screen : Home_FurnitureInvoice},
                  Home_Invoice : {screen : Home_Invoice},
                  Home_PaymentProceed : {screen : Home_PaymentProceed},
                  Home_SelectDriver : {screen : Home_SelectDriver},
                  HourlyGetEstimate : {screen : HourlyGetEstimate},
                  Hourly_Invoice: {screen : Hourly_Invoice},
                  Hourly_PaymentProceed : {screen : Hourly_PaymentProceed},
                  Home_ServicesItemsCourier : {screen : Home_ServicesItemsCourier},
                  Home_ServicesItemsFurniture : {screen : Home_ServicesItemsFurniture},

                },{headerMode: "none",}),
            		navigationOptions: ({ navigation }) => ({
            			title: 'Home',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.customer.home} style={[styles.customericon,{tintColor}]}  resizeMode={'contain'}/>
            			},
            		}),
          		},
          		CustomerOrders: {
                screen: StackNavigator({

                  CustomerOrders:{screen: CustomerOrders},
                  Orders_Pending : {screen : Orders_Pending},
                  Orders_OnGoing : {screen : Orders_OnGoing},
                  Orders_Scheduled : {screen : Orders_Scheduled},

                },{headerMode: "none",}),
            		navigationOptions: ({ navigation }) => ({
            			title: 'Orders',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.customer.orders} style={[styles.customericon,{tintColor}]} resizeMode={'contain'}/>
            			},
            		}),
          		},
          		CustomerMessages: {
            		screen: StackNavigator({
                  CustomerMessages:{screen : CustomerMessages},
                },{headerMode: "none",}),
            		navigationOptions: ({ navigation }) => ({
            			title: 'Messages',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.customer.message} style={[styles.customericon,{tintColor}]} resizeMode={'contain'}/>
            			},
            		}),
          		},
          		CustomerNotifications: {
            		screen: CustomerNotifications,
            		navigationOptions: ({ navigation }) => ({
            			title: 'Notification',
            			tabBarIcon: ({tintColor}) => {
            				return <Image source={Constants.Images.customer.notification} style={[styles.customericon,{tintColor}]}  resizeMode={'contain'}/>
            			},
            		}),
          		},
        	},{tabBarOptions: {
                      showIcon: true,
                      //showLabel: Platform.OS === 'ios' ? true : false,
                      activeTintColor:Constants.Colors.LightBlue,
                      //inactiveTintColor : Constants.Colors.BlurGrey,
                      style: {
                        width: Constants.BaseStyle.DEVICE_WIDTH,
                        backgroundColor: Constants.Colors.White,
                      },
                      indicatorStyle: {
                        backgroundColor: Constants.Colors.LightBlue,

                      }
              },
            tabBarPosition: 'bottom'}),
        	   navigationOptions: ({ navigation }) => ({
          		title: 'Home',
        	}),
      	},

      }, {
        contentComponent: CustomerProfileDrawer,
        mode: 'modal',
        headerMode: 'none',
        drawerWidth: Constants.BaseStyle.DEVICE_WIDTH /100*85,
      }
  )},

};

const styles = StyleSheet.create({
  icon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 6.5,
  },
  customericon: {
    //marginTop:2,
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 6.5,
  }
});
