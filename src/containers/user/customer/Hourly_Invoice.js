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
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ShadowButton from "../../../components/customer/ShadowButton";
import HourlyServiceHeaderMenu from '../../../components/customer/HourlyServiceHeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import {BoxShadow} from 'react-native-shadow';

//import { ToastActionsCreators } from 'react-native-redux-toast';

class Hourly_Invoice extends Component<{}> {
  constructor(props){
    super(props);
  }

  itemList(data)
  {
    let { item, index } = data;
    var arr1=[];
    var len=this.props.state.pickupArr.length;
    this.props.state.pickupArr.map((val,i) => {
      if(i<len-1)
        arr1.push(val);
    });

    const shadowOpt = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 20,
                        color:"#000",
                        border:3,
                        radius:4,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
                      };
    return(
      <BoxShadow setting={shadowOpt}>
        <View style={{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 20}}>
          <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <Text style={[styles.textStyle,{color:'#5D5D5D',flex:0.3,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
              {'Pickup '}{index+1}{': '}
            </Text>
            <View style={[styles.flexRow,{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6,marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
              <Image source={Constants.Images.customer.pickup} style={[styles.pickupIcon]} resizeMode={'contain'}/>
              <Text numberOfLines={1} style={[styles.textStyle,{textAlign:'left',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {arr1[index].address}
              </Text>
            </View>
          </View>

          <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <View style={{flex:0.5,justifyContent:'flex-start'}}>
              <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'Delivery Cost'}
              </Text>
            </View>
            <View style={{flex:0.5,justifyContent:'flex-end'}}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'$'}{item.deliveryCharge}
              </Text>
            </View>
          </View>

          {/*<View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <View style={{flex:0.5,justifyContent:'flex-start'}}>
              <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.header2}
              </Text>
            </View>
            <View style={{flex:0.5,justifyContent:'flex-end'}}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.item2}
              </Text>
            </View>
          </View>

          <View style={[styles.flexRow,{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <View style={{flex:0.5,justifyContent:'flex-start'}}>
              <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.header3}
              </Text>
            </View>
            <View style={{flex:0.5,justifyContent:'flex-end'}}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {item.item3}
              </Text>
            </View>
          </View>*/}

        </View>
      </BoxShadow>
    )
  }

  onClickProceed()
  {
    let { navigate } = this.props.navigation;

    this.props.dispatch({type:'SET_HOURLYSERVICE_TABINDEX',index:2});
     navigate('Hourly_PaymentProceed');
  }


  render() {
    const { navigate, goBack } = this.props.navigation;

    const shadowPayment = {width:Constants.BaseStyle.DEVICE_WIDTH/100 * 90,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6.3,
                        color:"#000",
                        border:3,
                        radius:20,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
                        marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}
                      };

    const shadowOpt = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 26.2,
                        color:"#000",
                        border:3,
                        radius:4,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
                      };
    const shadowOtherService = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10.2,
                        color:"#000",
                        border:3,
                        radius:4,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
                      };

    return (
      <View style={{flex:1,backgroundColor:'#f4f5f7'}}>
        <HeaderBackground navigation={navigate} goBack={goBack}/>

        <HourlyServiceHeaderMenu navigation={navigate}/>
        <View style={{backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 13,marginTop: Constants.BaseStyle.DEVICE_WIDTH*3/100}}>
          <BoxShadow setting={shadowPayment}>
            <TouchableOpacity activeOpacity={0.5} style={[styles.ButtonStyle,{marginBottom: Constants.BaseStyle.DEVICE_WIDTH*1/100}]} onPress={() => this.onClickProceed()}>
                <Text style={[styles.ButtonTextStyle,{fontSize:Constants.CustomerFonts.BigSize.fontSize,}]}>
                {'Pay '}
                  <Text style={[styles.ButtonTextStyle,{fontSize:Constants.CustomerFonts.BigSize.fontSize, color: '#306AB3'}]}>
                  {'$'}{this.props.state.InvoiceData.totalCharge}
                  </Text>
                </Text>
            </TouchableOpacity>
          </BoxShadow>
        </View>

        <View style={[{justifyContent:'flex-start',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
          <Text style={[styles.textStyle,{fontSize:Constants.CustomerFonts.normal.fontSize,color:'#53C8E5',textAlign:'left'}]}>
            {'Invoice'}
          </Text>
        </View>

        <BoxShadow setting={shadowOpt}>
          <View style={{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 26}}>
            <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                <Text style={[styles.textStyle,{color:'#5D5D5D',flex:1,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  {' '}
                </Text>
                <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                  {'Hours'}
                </Text>
                <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                  {'Fee'}
                </Text>
                <Text style={[styles.textStyle,{flex:0.3,textAlign:'right',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  {'Cost'}
                </Text>
            </View>
            <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                <Text style={[styles.textStyle,{color:'#5D5D5D',flex:1,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  {'Hourly Delivery'}
                </Text>
                <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                  {this.props.state.Orders[0].duration}
                </Text>
                <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                  {'$'}{this.props.state.Orders[0].fee}
                </Text>
                <Text style={[styles.textStyle,{flex:0.3,textAlign:'right',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  {'$'}{this.props.state.Orders[0].cost}
                </Text>
            </View>

            <View style={[styles.horizontalLine]}/>
            <View style={[{justifyContent:'flex-start'}]}>
              <Text style={[styles.textStyle,{color:'#C3C1C0',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'Other Services'}
              </Text>
            </View>

            <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',flex:1,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'Tailgate'}
              </Text>
              <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                {''}
              </Text>
              <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                {''}
              </Text>
              <Text style={[styles.textStyle,{flex:0.3,textAlign:'right',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'$'}{this.props.state.InvoiceData.driver_help_cost}
              </Text>
            </View>
            <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',flex:1,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'Extra Helper'}
              </Text>
              <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                {''}
              </Text>
              <Text style={[styles.textStyle,{flex:0.3,textAlign:'center'}]}>
                {''}
              </Text>
              <Text style={[styles.textStyle,{flex:0.3,textAlign:'right',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'$'}{this.props.state.InvoiceData.extra_help_cost}
              </Text>
            </View>
          </View>
        </BoxShadow>

        <BoxShadow setting={shadowOtherService}>
          <View style={{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 20/*30*/}}>
          <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <View style={{flex:0.5,justifyContent:'flex-start'}}>
              <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'Sub Total'}
              </Text>
            </View>
            <View style={{flex:0.5,justifyContent:'flex-end'}}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'$'}{this.props.state.InvoiceData.subTotal}
              </Text>
            </View>
          </View>

          <View style={[styles.flexRow,{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
            <View style={{flex:0.5,justifyContent:'flex-start'}}>
              <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'GST (%'}{this.props.state.InvoiceData.GST}{')'}
              </Text>
            </View>
            <View style={{flex:0.5,justifyContent:'flex-end'}}>
              <Text style={[styles.textStyle,{color:'#5D5D5D',textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                {'$'}{this.props.state.InvoiceData.gstAmt}
              </Text>
            </View>
          </View>

          <View style={[styles.horizontalLine]}/>
            <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,marginBottom: Constants.BaseStyle.DEVICE_WIDTH*3/100}]}>
              <View style={{flex:0.5,justifyContent:'flex-start'}}>
                <Text style={[styles.textStyle,{fontSize:Constants.CustomerFonts.BigSize.fontSize,textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  {'Total'}
                </Text>
              </View>
              <View style={{flex:0.5,justifyContent:'flex-end'}}>
                <Text style={[styles.textStyle,{fontSize:Constants.CustomerFonts.BigSize.fontSize,textAlign:'right',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  {'$'}{this.props.state.InvoiceData.totalCharge}
                </Text>
              </View>
            </View>

          </View>
        </BoxShadow>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow:{
		flexDirection: 'row',
	},
  pickupIcon:{
    //marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
    marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  horizontalLine:{
    height:2,
  	backgroundColor: '#EFEDED',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
  },
  textStyle:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    textAlign:'center',
  	color:'#081933',
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //marginBottom:10,
    marginTop:0,//10,
    marginLeft:0,//10,
    marginRight:0,//10,
    borderRadius:30,
    backgroundColor: '#53C8E5',
    borderColor: "#53C8E5",
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:Constants.Colors.White,
    textAlign:'center',
  },

});
export default connect(state => ({state: state.CustomerReducer}))(Hourly_Invoice);
