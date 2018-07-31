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
  ScrollView,
  TouchableOpacity,
  FlatList,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';


import Constants from "../../constants";
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { ToastActionsCreators } from 'react-native-redux-toast';
import {BoxShadow} from 'react-native-shadow';
import moment from 'moment';
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = 1;//LATITUDE_DELTA * ASPECT_RATIO;
var navigate=null;
class ServiceRegularMapView extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      error:null,

      initialPosition:
      {
        latitude:28.6139,
        longitude:77.2090,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      markerPosition:{
        latitude:28.6139,
        longitude:77.2090,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
    }
    this.initialPosition = this.state.initialPosition;
  }

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
  }*/

  onRegionChange(region) {
          this.setState({
              initialPosition: region
          });
      }




  vehicalList(item)
  {
    var width=100/this.props.state.FilteredTransportArray.length;
    return(

          <View style={[{backgroundColor:Constants.Colors.WhiteSmoke,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 13,width:Constants.BaseStyle.DEVICE_WIDTH/100 * width}]}>
            <TouchableOpacity onPress={() => {this.setActiveTransport(item.tag)}}>
              <View style={{alignItems:'center',backgroundColor:item.backgroundColor,borderBottomColor:item.borderBottomColor,borderBottomWidth:item.borderBottomWidth}}>
                <Text style={[styles.transportCostStyle]}>{item.cost}</Text>
                <Image source={item.displayimg} style={[styles.transportIcons,{alignItems:'center'}]} resizeMode={'contain'}/>
                <Text style={[styles.transportLabel]}>{item.header}</Text>
              </View>
            </TouchableOpacity>
          </View>
      )
  }
  setActiveTransport(id)
  {
      this.props.dispatch({type:'ACTIVE_VEHICLE_FILTER', tagid:id});
  }


  render() {
    let {height} = this.props;
    navigate  = this.props.navigation;

    return (
      <View style={{flex:1/*,zIndex:0,bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1*/}}>
        <View style={[styles.rootContainer]}>
            <MapView
              style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * height,zIndex:0}}
              zoomEnabled={true}
              initialRegion={this.props.state.initialPosition}
              region={this.props.state.initialPosition}
              showsUserLocation={true}
              followsUserLocation={false}
              pitchEnabled={false}
              rotateEnabled={false}
              //minZoomLevel={15}
              >
              <MapView.Circle
                center = { this.state.initialPosition }
                radius = { 50 }
                //strokeWidth = { 1 }
                strokeColor = { 'rgba(83,200,229,0.5)' }
                fillColor = { 'rgba(83,200,229,0.5)' }

                />

                {this.props.state.markerPositions.map((marker, i) => (
                      <MapView.Marker
                        coordinate={marker.coordinates}
                        title={marker.title}
                        image={marker.img}
                        key={marker.id}
                      />
                    ))}

            </MapView>
            <View style={[styles.subsubContainer,{opacity : 0.8}]}>
              <FlatList data={this.props.state.FilteredTransportArray} renderItem={({item})=>this.vehicalList(item)} horizontal={true}/>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Constants.Colors.White,//'#F5FCFF'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  flexRow:{
		flexDirection: 'row',
	},
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subsubContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 11,//34,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //opacity: 0.87,
  },
  transportIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 14,
    padding:0,
  },
  transportLabel:{
    textAlign:'center',
    marginTop:0,
    color:'#081933',
    fontSize:Constants.CustomerFonts.small_13.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },
  transportCostStyle:{
    textAlign:'center',
    //marginTop:0,
    color:'#306AB3',
    fontSize:Constants.CustomerFonts.small_13.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },


});

export default connect(state => ({state: state.CustomerReducer}))(ServiceRegularMapView);
