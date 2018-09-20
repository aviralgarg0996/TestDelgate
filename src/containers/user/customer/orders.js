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
  TextInput,
  View,
  Image,
  TouchableOpacity,
    ImageBackground,
  ScrollView,
  ListView
} from 'react-native';


import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { ToastActionsCreators } from 'react-native-redux-toast';
import {BoxShadow} from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';

export default class CustomerOrders extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      pendingFlag:0,
      scheduledFlag:1,
      ongoingFlag:0,
      OrdersList : [{id:0,orderNo:'#9786',date:'07/08/2018',amount:'$250',time:'3:50 PM - 5::50 PM',duration:'120 Mins'},
                  {id:0,orderNo:'#9745',date:'08/08/2018',amount:'$350',time:'3:50 PM - 5::50 PM',duration:'120 Mins'},
                  {id:0,orderNo:'#4545',date:'08/08/2018',amount:'$450',time:'3:50 PM - 5::50 PM',duration:'120 Mins'},
                  {id:0,orderNo:'#4546',date:'09/08/2018',amount:'$250',time:'3:50 PM - 5::50 PM',duration:'120 Mins'},
                  {id:0,orderNo:'#97454',date:'10/08/2018',amount:'$650',time:'3:50 PM - 5::50 PM',duration:'120 Mins'},
                  {id:0,orderNo:'#6467',date:'14/08/2018',amount:'$750',time:'2:50 PM - 4::50 PM',duration:'120 Mins'},
                  {id:0,orderNo:'#9786',date:'18/08/2018',amount:'$850',time:'4:50 PM - 5::50 PM',duration:'60 Mins'},
                  ],


    }
  }



  setViewColorOnClick(value)
  {
    if(value === 1)
    {
      return [styles.colIndexViewBlack];
    }
    else {
      return [styles.colIndexViewWhite];
    }
  }

  setTextColorOnClick(value)
  {
    if(value === 1)
    {
      return [styles.colIndexLabelBlack];
    }
    else {
      return [styles.colIndexLabelWhite];
    }
  }
  onPressInfo(value)
  {

    if(parseInt(value) === 1)
    {
      //this.setState({DeliveryFlag:1,HourlyFlag:0});
    //  this.props.dispatch({type:'SET_SERVICEFLAG',pendingFlag:1,scheduledFlag:0,ongoingFlag:0});
    }
    else {
      //this.setState({DeliveryFlag:0,HourlyFlag:1});
      //this.props.dispatch({type:'SET_SERVICEFLAG',pendingFlag:0,scheduledFlag:1,onGoingFlag:0});
    }
  }
  renderRow(value)
  {
    let { navigate } = this.props.navigation;
    const shadowOpt = {
        width:Constants.BaseStyle.DEVICE_WIDTH,
        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 15.2,
        color:"#000",
        border:3,
        radius:1,
        opacity:0.1,
        x:0,
        y:2,
        style:{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
    };
    return(
      <BoxShadow setting={shadowOpt}>

      <View style={[styles.container,{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 15}]}>
      <TouchableOpacity onPress={() => navigate('Orders_Scheduled')}>
          <View style={[styles.flexRow,{marginTop: Constants.BaseStyle.DEVICE_WIDTH*1.5/100,}]}>
            <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
              <Text style={{color:'#53C8E5',}}>{value.duration}</Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
              <Text style={{color:'#16477C',}}>{'Order ID '}{value.orderNo} </Text>
            </View>
          </View>
          <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1.5/100,}]}>
            <View style={{justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
              <Text>{'Delivery Date: '}{value.date}</Text>
            </View>
          </View>
          <View style={[styles.flexRow]}>
            <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
               <Text>{'Time Frame:'} {value.time} </Text>
             </View>
             <View style={{flex:0.5,alignItems:'flex-end',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
               <Text style={{color:'#C3C1C0',}}>{value.amount}</Text>
             </View>
          </View>
          </TouchableOpacity>
        </View>

        </BoxShadow>
    )
  }

  render() {
    const shadowOpt = {
        width:Constants.BaseStyle.DEVICE_WIDTH,
        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6.2,
        color:"#000",
        border:3,
        radius:1,
        opacity:0.1,
        x:0,
        y:2,
        style:{zIndex:1}
    };
  var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.OrdersList);

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <HeaderBackground navigation={navigate}/>
        <BoxShadow setting={shadowOpt}>
          <View style={[styles.flexRow]}>
            <TouchableOpacity onPress={() => navigate('Orders_Pending')} style={[styles.colIndex,this.setViewColorOnClick(this.state.pendingFlag)]}>
                <Text style={this.setTextColorOnClick(this.state.pendingFlag)}>{'PENDING'}</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[styles.colIndex,this.setViewColorOnClick(this.state.scheduledFlag)]}>
                <Text style={this.setTextColorOnClick(this.state.scheduledFlag)}>{'SCHEDULED'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Orders_OnGoing')}  style={[styles.colIndex,this.setViewColorOnClick(this.state.ongoingFlag)]}>
                <Text style={this.setTextColorOnClick(this.state.ongoingFlag)}>{'ONGOING'}</Text>
            </TouchableOpacity>
          </View>
        </BoxShadow>
                <View style ={styles.searchContainer}>

                  <TextInput autoFocus={false}  style={styles.txtInputSearch} placeholder={'Search in orders'} underlineColorAndroid="transparent" />
                  <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'}/>
                </View>
                <View style={styles.ordercontainer}>
                  <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                    <Text style={styles.NewOrderStyle}>NEW ORDER</Text>
                  </View>
                  <View style={{flex:0.5,alignItems:'flex-end',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                    <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'contain'}/>
                  </View>
                </View>


                <ListView enableEmptySections={true} dataSource={dataSource} renderRow={this.renderRow.bind(this)} keyboardShouldPersistTaps={'handled'}/>

                {/*<FlatList data={this.props.state.SearchPlaceList} renderItem={({item}) => this.renderRow(item)} keyboardShouldPersistTaps="always"/>*/}






      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Constants.Colors.WhiteSmoke
  },


  navigationBar:{
    backgroundColor:'transparent',//Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  navBarRight:{
			flex:1,
			flexDirection:'row',
			height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
			//marginTop:0,
			alignItems:'center',
			justifyContent:'flex-end',
			backgroundColor:'transparent',
      marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
		},
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },

  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 9,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 9,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  NewOrderStyle:{
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.BigSize.fontFamily,
  	color:'#53C8E5',
    textDecorationLine:'underline',
  },
  horizontalLine:{
    height:2,
  	backgroundColor: '#B1B1B1',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  flexRow:{
		flexDirection: 'row',
	},
  flexCol:{
		flexDirection:'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
  colIndex:{
		flex:1,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
    alignItems:'center',
    justifyContent:'center',
	},
  colIndexViewWhite:{
    backgroundColor : Constants.Colors.White,
	},
  colIndexViewBlack:{
    backgroundColor : Constants.Colors.LightBlue,
	},
  colIndexLabelWhite:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
		color:Constants.Colors.LightBlue,
    textAlign: "center",
	},
  colIndexLabelBlack:{
		fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
		color:Constants.Colors.White,
    textAlign: "center",
	},
  cardView: {
  		backgroundColor:Constants.Colors.WhiteSmoke,
      borderRadius:15,

      marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1.5/100,
      justifyContent:'center',
  	},
  inviteFriendIcon:{
      height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18,
      width: Constants.BaseStyle.DEVICE_WIDTH/100 * 22,
      marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },
  inviteFriendHeader: {
      fontSize:Constants.CustomerFonts.bold.fontSize,
      fontFamily:Constants.CustomerFonts.bold.fontFamily,
      textAlign:'left',
      color: '#081933',
  },
  inviteFriendText: {
      color: '#969297',
      fontSize:Constants.CustomerFonts.normal.fontSize,
      fontFamily:Constants.CustomerFonts.normal.fontFamily,
      textAlign:'left',
      marginRight: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    },
  ReportStyle:{
      color: '#414141',
      fontSize:Constants.CustomerFonts.BigSize.fontSize,
      fontFamily:Constants.CustomerFonts.normal.fontFamily,
      //paddingVertical: Constants.BaseStyle.PADDING * 0.4,
      marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    },
  MoreReportStyle:{
      color: Constants.Colors.LightBlue,
      fontSize:Constants.CustomerFonts.normal.fontSize,
      fontFamily:Constants.CustomerFonts.normal.fontFamily,
      marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
      textDecorationLine:'underline',
    },
    searchContainer:{//in use
      backgroundColor:'#fff',
      justifyContent:'center',
      height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
      flexDirection:'row',
      alignItems:'center',
      //padding:5,
      borderRadius:7,
      //paddingLeft: 10,
      //paddingRight:10,
      marginLeft:15,
      marginRight:15,
      marginTop:10,
      marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,

    },
    searchContentIcon: {
      //tintColor:'#898988',
      height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3.5,
      width: Constants.BaseStyle.DEVICE_WIDTH/100 * 3.5,
      marginRight: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    },
    filterIcon: {
      //tintColor:'#898988',
      height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
      width: Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
      //marginRight: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    },
    txtInputSearch: {
      backgroundColor:'#fff',
      color: '#5D5D5D',
      fontSize:Constants.CustomerFonts.small.fontSize,
      fontFamily:Constants.CustomerFonts.normal.fontFamily,
      //paddingRight:10,
      //paddingTop:3,
      //paddingBottom:3,
      flex:1,
      marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
    },
    ordercontainer:{
      flexDirection:'row',
      marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,

      //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*4,
    },



});
