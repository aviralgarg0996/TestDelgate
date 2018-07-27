'use strict';
import {
  Platform,
} from 'react-native';

import Constants from "../../constants";
import moment from 'moment';

// Actions


// Action Creators


//perform api's related to user


/**
* Initial state
*/
const initialState = {
  DeliveryFlag:1,
  HourlyFlag:0,
  vehicleID : 0,
  pickupArr:[{address : 'Choose Pickup Location',img : 'plus',next:3,prev:1}],
  dropArr:[{address : 'Choose Drop Off Location',img : 'plus',next:3,prev:1}],
  PickDropFlag:0,//1 for Pickup, 2 for Drop
  AddressCount : 0,
  placeModalVisibility:false,
  DeliveryServiceOpacity:0.8,
  EstimateColor : '#969297',
  pickUpControlCount:1.9,
  EstimateButtonBackgroundColor:'#ffffff',//'#f4f5f7',

  TransportArr : [
    {tag:'1',displayimg:Constants.Images.customer.bike,imgsource:Constants.Images.customer.bike,
      activeimgsource:Constants.Images.customer.active_bike,header:'Bike',backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'},
    {tag:'2',displayimg:Constants.Images.customer.small,imgsource:Constants.Images.customer.small,
      activeimgsource:Constants.Images.customer.active_small,header:'Small',backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'},
    {tag:'3',displayimg:Constants.Images.customer.medium,imgsource:Constants.Images.customer.medium,
      activeimgsource:Constants.Images.customer.active_medium,header:'Medium',backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'},
    {tag:'4',displayimg:Constants.Images.customer.large,imgsource:Constants.Images.customer.large,
      activeimgsource:Constants.Images.customer.active_large,header:'Large',backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'},
    {tag:'5',displayimg:Constants.Images.customer.xlarge,imgsource:Constants.Images.customer.xlarge,
      activeimgsource:Constants.Images.customer.active_xlarge,header:'XLarge',backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'},
    {tag:'6',displayimg:Constants.Images.customer.truck_deck,imgsource:Constants.Images.customer.truck_deck,
      activeimgsource:Constants.Images.customer.active_truck_deck,header:'DeckTruck',backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'},
    {tag:'7',displayimg:Constants.Images.customer.truck_fridge,imgsource:Constants.Images.customer.truck_fridge,
      activeimgsource:Constants.Images.customer.active_truck_fridge,header:'FridgeTruck',backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'}
    ],

    HourlyServiceDisplayDate : 'Select Date',
    HourlyServiceDate :  moment().format('YYYY-MM-DD'),

    HourlyServiceDisplayTime : 'Select Time',
    HourlyServiceTime :  moment().format('hh:mm'),

    HourlyServiceDisplayDuration : 'Select Duration',
    FoodRange : 3,



};

/**
* Reducer
*/
export default function CustomerReducer(state = initialState, action = {})
{
    var newstate = Object.assign({}, state);
    switch (action.type) {
      case 'SET_SERVICEFLAG':
        newstate.HourlyFlag=action.hourlyFlag;
        newstate.DeliveryFlag=action.deliveryFlag;
        return newstate;
      case 'ACTIVE_VEHICLE':
        newstate.vehicleID = parseInt(action.tagid);
        var arr1=[];
        newstate.TransportArr.map((val,i) => {
          if(parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({tag:val.tag,displayimg:val.activeimgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor,borderBottomWidth:4,borderBottomColor:Constants.Colors.LightBlue});
          else {
            arr1.push({tag:val.tag,displayimg:val.imgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'});
          }
        });
        newstate.TransportArr=[];
        newstate.TransportArr=arr1;
        return newstate;
      case 'ADD_PICKUP':
        var arr1=[];
        var len=newstate.pickupArr.length;
        newstate.pickupArr.map((val,i) => {
          if(i<len-1)
            arr1.push({address : val.address,img : 'none',next:val.next,prev:val.prev});
        });
        arr1.push({address : action.pickup,img : 'none',next:3,prev:1});
        /*if (len==3) {
          newstate.dropArr = [];
        }
        else {*/
          arr1.push({address : 'Choose Another Pickup Location',img : 'plus',next:3,prev:1});
        //}
        newstate.pickupArr = [];
        newstate.pickupArr = arr1;
        newstate.AddressCount = newstate.AddressCount + 1;
        newstate.placeModalVisibility = action.visibility;
        newstate.DeliveryServiceOpacity=1;
        newstate.EstimateColor='#53C8E5';
        newstate.EstimateButtonBackgroundColor='#ffffff';
        newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;

        if(newstate.vehicleID==0)
        {
          newstate.vehicleID = 2;
        }
        var arr1=[];
        newstate.TransportArr.map((val,i) => {
          if(parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({tag:val.tag,displayimg:val.activeimgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor,borderBottomWidth:4,borderBottomColor:Constants.Colors.LightBlue});
          else {
            arr1.push({tag:val.tag,displayimg:val.imgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'});
          }
        });
        newstate.TransportArr=[];
        newstate.TransportArr=arr1;
        return newstate;

      case 'ADD_DROP':
        var arr1=[];
        var len=newstate.dropArr.length;
        newstate.dropArr.map((val,i) => {
          if(i<len-1)
            arr1.push({address : val.address,img : 'none'});
        });
        arr1.push({address : action.drop,img : 'none'});
        /*if (len==3) {
          newstate.pickupArr = [];
        }
        else {*/
          arr1.push({address : 'Choose Drop Off Another Location',img : 'plus'});
        //}
        newstate.dropArr = [];
        newstate.dropArr = arr1;
        newstate.AddressCount = newstate.AddressCount + 1;
        newstate.placeModalVisibility = action.visibility;
        newstate.DeliveryServiceOpacity=1;
        newstate.EstimateColor='#53C8E5';
        newstate.EstimateButtonBackgroundColor='#ffffff';
        newstate.pickUpControlCount = newstate.pickUpControlCount + 0.85;
        if(newstate.vehicleID==0)
        {
          newstate.vehicleID = 2;
        }
        var arr1=[];
        newstate.TransportArr.map((val,i) => {
          if(parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({tag:val.tag,displayimg:val.activeimgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor,borderBottomWidth:4,borderBottomColor:Constants.Colors.LightBlue});
          else {
            arr1.push({tag:val.tag,displayimg:val.imgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'});
          }
        });
        newstate.TransportArr=[];
        newstate.TransportArr=arr1;
        return newstate;

      case 'SETPICKDROPFLAG':
        newstate.PickDropFlag = action.flag;
        return newstate;
      case 'PLACE_FINDER_MODAL':
        newstate.placeModalVisibility = action.visibility;
        return newstate;
      case 'SET_HOUR':
        newstate.HourlyServiceDisplayDate = action.displayDate;
        newstate.HourlyServiceDate  = action.date;
        newstate.EstimateColor='#53C8E5';
        newstate.EstimateButtonBackgroundColor='#ffffff';
        newstate.DeliveryServiceOpacity=1;
        if(newstate.vehicleID==0)
        {
          newstate.vehicleID = 2;
        }
        var arr1=[];
        newstate.TransportArr.map((val,i) => {
          if(parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({tag:val.tag,displayimg:val.activeimgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor,borderBottomWidth:4,borderBottomColor:Constants.Colors.LightBlue});
          else {
            arr1.push({tag:val.tag,displayimg:val.imgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'});
          }
        });
        newstate.TransportArr=[];
        newstate.TransportArr=arr1;
        return newstate;
      case 'SET_TIME':
        newstate.HourlyServiceDisplayTime = action.displayTime;
        newstate.HourlyServiceTime  = action.time;
        newstate.EstimateColor='#53C8E5';
        newstate.EstimateButtonBackgroundColor='#ffffff';
        newstate.DeliveryServiceOpacity=1;
        if(newstate.vehicleID==0)
        {
          newstate.vehicleID = 2;
        }
        var arr1=[];
        newstate.TransportArr.map((val,i) => {
          if(parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({tag:val.tag,displayimg:val.activeimgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor,borderBottomWidth:4,borderBottomColor:Constants.Colors.LightBlue});
          else {
            arr1.push({tag:val.tag,displayimg:val.imgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'});
          }
        });
        newstate.TransportArr=[];
        newstate.TransportArr=arr1;
        return newstate;
      case 'SET_DURATION':
        newstate.HourlyServiceDisplayDuration = action.displayDuration;
        newstate.EstimateColor='#53C8E5';
        newstate.EstimateButtonBackgroundColor='#ffffff';
        newstate.DeliveryServiceOpacity=1;
        if(newstate.vehicleID==0)
        {
          newstate.vehicleID = 2;
        }
        var arr1=[];
        newstate.TransportArr.map((val,i) => {
          if(parseInt(newstate.vehicleID) == parseInt(val.tag))
            arr1.push({tag:val.tag,displayimg:val.activeimgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor: newstate.EstimateButtonBackgroundColor,borderBottomWidth:4,borderBottomColor:Constants.Colors.LightBlue});
          else {
            arr1.push({tag:val.tag,displayimg:val.imgsource,imgsource:val.imgsource,
              activeimgsource:val.activeimgsource,header:val.header,
              backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'});
          }
        });
        newstate.TransportArr=[];
        newstate.TransportArr=arr1;
        return newstate;

      case 'SET_FOODRANGE':
        newstate.FoodRange = action.range;
        var arr1=[];
        newstate.pickupArr.map((val,i) => {
            arr1.push({address : val.address,img : val.img,next:action.range,prev:1});
        });
        newstate.pickupArr = [];
        newstate.pickupArr = arr1;
        return newstate;

      case 'SET_ITEMRANGE_ARRAY':
      var arr1=[];
      var temp=action.array;
        newstate.pickupArr.map((val,i) => {
            arr1.push({address : val.address,img : val.img, next:action.array[i].next,prev:action.array[i].prev});
        });
        newstate.pickupArr = [];
        newstate.pickupArr = arr1;
        return newstate;

      default:
          return newstate;
    }
}
