import React, { Component } from "react";
import { StyleSheet} from "react-native";
import Constants from '../../constants';
import CalendarStrip from "react-native-calendar-strip";

export default class Calendar extends Component{
  render(){
    //console.log(this.props)
    return (
      <CalendarStrip
        selectedDate={this.props.currentDate}
        calendarAnimation={{type: 'sequence', duration: 30}}
        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: Constants.Colors.LightBlue}}
        style={{height:100, paddingTop: 10, paddingBottom: 10}}
        calendarHeaderStyle={{color: Constants.Colors.Blue}}
        calendarColor={'white'}
        dateNumberStyle={{color: Constants.Colors.Blue}}
        dateNameStyle={{color: Constants.Colors.Blue}}
        iconLeft={Constants.Images.driver.backward}
        iconRight={Constants.Images.driver.next}
        iconContainer={{flex: 0.1}}
        onDateSelected={(date)=>this.props.getDateSelected(date)}
      />
    );
  }
};

const styles = StyleSheet.create({
  // loginButtonStyle: {
  //   borderWidth: 1,
  //   padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
  //   backgroundColor: '#53C8E5',
  //   borderColor: "#53C8E5",
  //   marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
  //   marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*10,
  //   borderRadius:5
  // }
});
