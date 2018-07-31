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
  TouchableHighlight,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import FormTextInput from "../../components/common/FormTextInput";
import SubmitButton from "../../components/common/FormSubmitButton";
var navigator=null;

var strButtonText=['I\'VE ARRIVED','PICK','NEXT STOP','DROP OFF'];
class DeliveryDetails extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      code:'',
      ButtonText:strButtonText[0],
      ButtonState:0,
    }
  }

  ScreenNo1()
  {
    return(
      <View style={[{flexDirection:'row',marginBottom:10}]}>
         <View style={[{flex : 1}]}>
           <SubmitButton
             onPress={() => navigator('Orders_ScheduledOrder')}
             text={'ACCEPT'}
             style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
             textStyle={[{fontSize:15}]}
           />
         </View>

      </View>
    )
  }

  ScreenNo2()
  {
    return(
      <View style={[{flexDirection:'row',marginBottom:10}]}>
         <View style={[{flex : 1}]}>
           <SubmitButton
             onPress={() => navigator('OnGoing')}
             text={'START'}
             style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
             textStyle={[{fontSize:15}]}
           />
         </View>
      </View>
    )
  }

  setButtonText()
  {
    var count=this.state.ButtonState+1;
    if(count<4)
      this.setState({ButtonState:count,ButtonText:strButtonText[count]});
    else {
      navigator('OrderDelivered');
    }
  }

  ScreenNo3()
  {

    return(
      <View style={[{flexDirection:'row',marginBottom:10}]}>
         <View style={[{flex : 1}]}>
           <SubmitButton
             onPress={() => {this.setButtonText()}}
             text={this.state.ButtonText}
             style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
             textStyle={[{fontSize:15}]}
           />
         </View>
      </View>
    )
  }

  render() {
    let {
      navigate,ButtonScreenNo
    } = this.props;

    navigator=navigate;


    var BottomButtons=null;
    if(parseInt(ButtonScreenNo)==1)
    {
      BottomButtons=this.ScreenNo1();
    }
    else if (parseInt(ButtonScreenNo)==2) {
      BottomButtons=this.ScreenNo2();
    }
    else if (parseInt(ButtonScreenNo)==3) {
      BottomButtons=this.ScreenNo3();
    }
    return (
          <View style={{}}>
            {(this.props.orderstate.ScreenMaxFlag===true) ?
              (this.state.ButtonState < 2) ?
                (parseInt(ButtonScreenNo)==4) ?
                  <View style={{}}>
                    <View  style={[styles.row,{marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*3,justifyContent:'flex-start'}]}>
                      <Image  style={[styles.smallIcon]} source={Constants.Images.driver.service}/>
                      <Text style={[styles.itemInBlue,{fontSize:14,fontWeight:'900',alignSelf:'center'}]}>{'Delivery Details'}</Text>
                    </View>
                    <View style={[{borderTopWidth:1,borderBottomWidth:1,borderBottomColor:Constants.Colors.BlurGrey,borderTopColor:Constants.Colors.Blue}]}>
                      <View>
                        <View  style={[styles.row,{marginBottom:10,marginTop:5,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                          <View style={{flex:2}}><Text style={[styles.itemInBlue,{fontSize:11}]}>{'- Pick from Subway, block B, Edmonton'}</Text></View>
                          <View style={{flex:1}}><Text style={[styles.itemInOrange,{fontSize:11,textAlign:'right',textDecorationLine:'underline'}]}>{'Product Detail'}</Text></View>
                          <View style={{flex:1}}><Text style={[styles.itemInBlue,{fontSize:11,textAlign:'right'}]}>{'ORDER PICKED'}</Text></View>
                        </View>
                        <View  style={[styles.row,{marginBottom:10,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                          <View style={{flex:2}}><Text style={[styles.itemInBlue,{fontSize:11}]}>{'- Drop to 9923, Edmonton Canada'}</Text></View>
                          <View style={{flex:1}}><Text style={[styles.itemInOrange,{fontSize:11,textAlign:'right'}]}>{''}</Text></View>
                          <View style={{flex:1}}><Text style={[styles.itemInBlue,{fontSize:11,textAlign:'right'}]}>{'ORDER DELIVERED'}</Text></View>
                        </View>

                      </View>
                      {BottomButtons}
                    </View>
                  </View>
                :
                  <View style={{}}>
                    <View  style={[styles.row,{marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*3,justifyContent:'flex-start'}]}>
                      <Image  style={[styles.smallIcon]} source={Constants.Images.driver.service}/>
                      <Text style={[styles.itemInBlue,{fontSize:14,fontWeight:'900',alignSelf:'center'}]}>{'Delivery Details'}</Text>
                    </View>
                    <View style={[{borderTopWidth:1,borderBottomWidth:1,borderBottomColor:Constants.Colors.BlurGrey,borderTopColor:Constants.Colors.Blue}]}>
                      <View>
                        <View  style={[styles.row,{marginBottom:10,marginTop:5,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                          <View style={{flex:0.70}}><Text style={[styles.itemInBlue,{color:Constants.Colors.LightGray,fontSize:12}]}>{'- Pick from Subway, block B, Edmonton'}</Text></View>
                          <View style={{flex:0.30}}><Text style={[styles.itemInOrange,{fontSize:12,textAlign:'right',textDecorationLine:'underline'}]}>{'Product Detail'}</Text></View>
                        </View>
                        <View  style={[styles.row,{marginBottom:10,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                          <View style={{flex:0.70}}><Text style={[styles.itemInBlue,{color:Constants.Colors.LightGray,fontSize:12}]}>{'- Drop Edmonton Canada'}</Text></View>
                          <View style={{flex:0.30}}><Text style={[styles.itemInOrange,{fontSize:12,textAlign:'right'}]}>{' '}</Text></View>
                        </View>

                      </View>
                      {BottomButtons}
                    </View>
                  </View>
                :
                <View style={{}}>
                  <View  style={[styles.row,{marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*3,justifyContent:'flex-start'}]}>
                    <Image  style={[styles.smallIcon]} source={Constants.Images.driver.service}/>
                    <Text style={[styles.itemInBlue,{fontSize:14,fontWeight:'900',alignSelf:'center'}]}>{'Delivery Details'}</Text>
                  </View>
                  <View style={[{borderTopWidth:1,borderBottomWidth:1,borderBottomColor:Constants.Colors.BlurGrey,borderTopColor:Constants.Colors.Blue}]}>
                    <View>
                      <View  style={[styles.row,{marginBottom:10,marginTop:5,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                        <View style={{flex:2}}><Text style={[styles.itemInBlue,{fontSize:11}]}>{'- Pick from Subway, block B, Edmonton'}</Text></View>
                        <View style={{flex:1}}><Text style={[styles.itemInOrange,{fontSize:11,textAlign:'right',textDecorationLine:'underline'}]}>{'Product Detail'}</Text></View>
                        <View style={{flex:1}}><Text style={[styles.itemInBlue,{fontSize:11,textAlign:'right'}]}>{'ORDER PICKED'}</Text></View>
                      </View>
                      <View  style={[styles.row,{marginBottom:10,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                        <View style={{flex:2}}><Text style={[styles.itemInBlue,{color:Constants.Colors.Gray,fontSize:12}]}>{'- Drop to 9923, Edmonton Canada'}</Text></View>
                        <View style={{flex:1}}><Text style={[styles.itemInOrange,{fontSize:11,textAlign:'right'}]}>{''}</Text></View>
                        <View style={{flex:1}}><Text style={[styles.itemInBlue,{fontSize:11,textAlign:'right'}]}>{' '}</Text></View>
                      </View>

                    </View>
                    {BottomButtons}
                  </View>
                </View>
            :
            <View>
              {BottomButtons}
            </View>
            }
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardView: {
			backgroundColor:'#fff',
			borderColor:Constants.Colors.BlurGrey,
			borderWidth:0.5,
			paddingLeft:5,
			paddingRight: 5,
			marginLeft:5,
			marginRight:5,
			marginTop:10,
      marginBottom:5,
		},
    smallIcon: {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
      height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
      margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
      //transform: [{rotate: '180deg'}],
    },
  row : {
    flexDirection:'row',
  },
  col : {
    flex:1,
  },

  itemRight: {
    flexDirection: "row",
    //height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    alignItems: "center",
    justifyContent:'flex-end'
  },

  clockIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  itemInBlue: {
    fontSize: 12,
    color: Constants.Colors.Blue
  },
  itemInOrange: {
    fontSize: 16,
    fontWeight:'900',
    color: Constants.Colors.Orange
  },
  ButtonStyle: {
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom:10,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    borderRadius:5,
  },


});

export default connect(state => ({modalstate: state.ModalHandleReducer,orderstate: state.OrdersHandleReducer}))(DeliveryDetails);
