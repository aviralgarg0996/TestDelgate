/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  FlatList,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";

var dismissKeyboard = require('dismissKeyboard');

class SearchPlace extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
    }
  }

  FilterCityList(searchcity)
  {
    var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + searchcity + '&components=country:'+this.props.state.CountryCode+'&key='+Constants.GoogleAPIKey+'';
    fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData !== null)
            this.props.dispatch({type : 'SEARCHPLACE', arr : responseData.predictions});
          else {
            this.props.dispatch({type : 'SEARCHPLACE', arr : []});
          }
      });
  }

  searchPlace(placeid,address)
  {
    dismissKeyboard();
    let context = this;
    let { dispatch } = this.props.navigation;
      //var CountryName='',CountryID = '',StateID='',StateName='',City='',strLat='',strLong='',TCor='',Zone='',District='';
      var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeid + '&key='+Constants.GoogleAPIKey+'';
      fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData !== null)
        {
           var arr = responseData;
           //this.AddPlace(address,arr.result.geometry.location.lat,arr.result.geometry.location.lng);
           if(this.props.state.PickDropFlag==1)
           {
             this.props.dispatch({type:'ADD_PICKUP',pickup:address,lat:arr.result.geometry.location.lat,long:arr.result.geometry.location.lng,visibility:false});
             //this.props.dispatch({type:'PLACE_FINDER_MODAL',visibility:false});
           }
           else {
             this.props.dispatch({type:'ADD_DROP',drop:address,lat:arr.result.geometry.location.lat,long:arr.result.geometry.location.lng,visibility:false});
             //this.props.dispatch({type:'PLACE_FINDER_MODAL',visibility:false});
           }

         }
         else {
             this.props.dispatch({type:'PLACE_FINDER_MODAL',visibility:false});
         }
         })
       .done();
  }

  renderRow(value)
  {
    return(
      <TouchableOpacity onPress={() => this.searchPlace(value.place_id,value.description)} style={styles.cardView}>
    			<View style={styles.flexRow}>
    			   <Text style={styles.addressTextStyle}>
  						{value.description}
  					</Text>
    			</View>
    		</TouchableOpacity>
    )
  }

  render() {
    let {navigate,goBack} = this.props;
    navigator=navigate;
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.state.SearchPlaceList);
    return (
      <View style={{flex:1,backgroundColor:Constants.Colors.WhiteSmoke}}>

          <ImageBackground
            source={Constants.Images.customer.TopHead}
            style={styles.navigationBarcontainer}
            imageStyle={{resizeMode: 'stretch'}}>
            <View style={styles.navigationBar}>
               <View style={styles.navBarRight}>
                   <TouchableOpacity onPress={() => {this.props.dispatch({type:'PLACE_FINDER_MODAL',visibility:false})}}>
                     <Image
                       source={Constants.Images.user.cross}
                       style={styles.closeIcon} resizeMode={'contain'}/>
                   </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <KeyboardAvoidingView behavior={'position'}>
              <View  style = {styles.searchContainer}>
      					<Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'}/>
                <TextInput autoFocus={false} onChangeText={(text) => this.FilterCityList(text)} style={styles.txtInputSearch} placeholder={'Type address here'} underlineColorAndroid="transparent" />
      				</View>
              <ListView enableEmptySections={true} dataSource={dataSource} renderRow={this.renderRow.bind(this)} keyboardShouldPersistTaps={'handled'}/>

              {/*<FlatList data={this.props.state.SearchPlaceList} renderItem={({item}) => this.renderRow(item)} keyboardShouldPersistTaps="always"/>*/}
          </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow:{
		flexDirection: 'row',
	},
  navigationBarcontainer:{
    //flex  : 1,
    width : Constants.BaseStyle.DEVICE_WIDTH,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
  },
  navigationBar:{
    backgroundColor:'transparent',//Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    alignItems:'center',
    flexDirection:'row',
  },
  navBarRight:{
		flex:1,
		flexDirection:'row',
		height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
		marginTop:0,
		alignItems:'center',
		justifyContent:'flex-end',
		backgroundColor:'transparent',
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
	},
  closeIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
    tintColor:'#ffffff',
  },
  cardView: {
			backgroundColor: '#ffffff',
			borderColor:'#d8d8d8',
			borderWidth:0.5,
			padding:11,
			//paddingLeft:15,
			//paddingRight: 15,
			marginLeft:15,
			marginRight:15,
			marginTop:10,
      marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
		},
    addressTextStyle:{
      fontSize:Constants.CustomerFonts.normal.fontSize,
      fontFamily:Constants.CustomerFonts.normal.fontFamily,
      flex : 1,
      justifyContent:'center',

    	color: '#5D5D5D',
    },
    searchContainer:{//in use
			backgroundColor:'#fff',
			justifyContent:'center',
			height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
			flexDirection:'row',
			alignItems:'center',
      padding:5,
			//paddingLeft: 10,
			//paddingRight:10,
      marginLeft:15,
			marginRight:15,
			//marginTop:10,
      marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,

		},
		searchContentIcon: {
			//tintColor:'#898988',
      height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
      width: Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
		},
    txtInputSearch: {
			backgroundColor:'#fff',
      color: '#5D5D5D',
      fontSize:Constants.CustomerFonts.normal.fontSize,
      fontFamily:Constants.CustomerFonts.normal.fontFamily,
			//paddingRight:10,
			//paddingTop:3,
			//paddingBottom:3,
			flex:1,
      //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
		},

});
export default connect(state => ({state: state.CustomerReducer}))(SearchPlace);
