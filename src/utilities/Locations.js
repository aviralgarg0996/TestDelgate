'use strict';
import React, { Component } from "react";
import { Alert, InteractionManager} from "react-native";
import Permissions from 'react-native-permissions';
import * as LocationActions from '../redux/modules/location';
import {startLoading, stopLoading} from '../redux/modules/app';
import Constants from '../constants';
import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle(Constants.GoogleAPIKey);

console.log("Testing");

export function checkPermissions(store, type) {
  Permissions.getPermissionStatus('location', 'whenInUse').then(response => {
      if(response==="authorized"){
        InteractionManager.runAfterInteractions(() => {
          navigator.geolocation.watchPosition(
            (success)=>{
              console.log('inside watchPosition',store.getState());
              
              Geocoder.geocodePosition({
                lat:success.coords.latitude,
                lng:success.coords.longitude
              }).then(res => {
                  store.dispatch(stopLoading())
                  store.dispatch(LocationActions.locationError(false));
                  store.dispatch(LocationActions.setDetails(res[0]));
              }).catch(err => {
                console.log('inside watchPosition',store.getState());
                  store.dispatch(stopLoading())

                  // store.dispatch(LocationActions.setDetails(null));
                  // store.dispatch(LocationActions.locationError(true));
              });
            },
            (error)=>{
              console.log('stopLoading errior',error);
               store.dispatch(stopLoading())
              store.dispatch(LocationActions.setDetails(null));
              store.dispatch(LocationActions.locationError(true));
            },
            {
              enableHighAccuracy: false, 
              timeout: 1000*60*1,
              maximumAge: 2000,
              distanceFilter:100
            }
          );
        });
      }else{
        requestPermissions(store, type);
      }
    });
}

export function requestPermissions(store, type){
  Permissions.requestPermission('location', 'whenInUse').then(response => {
        if(response!=="authorized"){
          store.dispatch(LocationActions.setDetails(null));
          store.dispatch(LocationActions.locationError(true));
          setTimeout(()=>{
            Alert.alert(
              type ? Constants.i18n.permissionsSignup.LocationPermissionHeader: Constants.i18n.permissions.LocationPermissionHeader, 
              type ? Constants.i18n.permissionsSignup.LocationPermissionText: Constants.i18n.permissions.LocationPermissionText, 
              [{
                text: "Enable",
                onPress:()=>{Permissions.openSettings()}
              },{
                text: "Cancel",
                onPress:()=>{console.log("cancelable")}
              }],
              {cancelable: false}
            );
          },700);
        }else{
          checkPermissions(store);
        }
  });
}