/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, StatusBar, TouchableOpacity,alert } from "react-native";


import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Dimensions from 'Dimensions';


const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = 1;//LATITUDE_DELTA * ASPECT_RATIO;
export default class Home extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      error:null,
      initialPosition:
      {
        longitude:30.7046,
        latitude:76.7179,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markerPosition:{
        longitude:30.7046,
        latitude:76.7179,
      }
    }
  };

  watchID: ?number = null;


  /*componentDidMount()
  {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

        var initialRegion={
          latitude : lat,
          longitude : long,
          latitudeDelta : LATITUDE_DELTA,
          longitudeDelta : LONGITUDE_DELTA,
        }

      this.setState({initialPosition:initialRegion});
      this.setState({markerPosition:initialRegion});
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );

    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var lastRegion={
        latitude : lat,
        longitude : long,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA,
      }

      this.setState({initialPosition:lastRegion});
      this.setState({markerPosition:lastRegion});
      });
  }

  componentWillUnmount()
  {
    navigator.geolocation.clearWatch(this.watchID);
  }*/

  render() {

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialPosition}
          showsUserLocation={true}
          followsUserLocation={true}>

          <MapView.Marker
            coordinate={this.state.markerPosition}
            title={"Your Location"}>
            {/*<View style={styles.radius}>
              <View style={styles.marker}>
              </View>
            </View>*/}
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F5FCFF'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  radius:{
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue'
  },
  styleheight:
  {
    height:Dimensions.get('window').height,///100 * 40,
  },
});
