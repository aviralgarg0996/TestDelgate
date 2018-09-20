/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  Image,
  Picker,
  DatePickerIOS,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { connect } from 'react-redux';

import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import Modal from "react-native-modal";
import SubmitButton from "../../../components/common/FormSubmitButton";
import NavigationBar from "react-native-navbar";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

var data = [
  {
    id: 1,
    idno: "Id 800",
    price: "$466",
    date: "MAR/10/2018,",
    timeframe : "12:00 pm to 4:00 pm",
    time: "30 mins"
  },
  {
    id: 2,
    idno: "Id 802",
    price: "$4764",
    date: "MAR/10/2018, ",
    timeframe : "12:00 pm to 4:00 pm",
    time: "30 mins"
  },
  {
    id: 3,
    idno: "Id 804",
    price: "$848",
    date: "MAR/10/2018, ",
    timeframe : "12:00 pm to 4:00 pm",
    time: "30 mins"
  },
  {
    id: 4,
    idno: "Id 800",
    price: "$466",
    date: "MAR/10/2018, ",
    timeframe : "12:00 pm to 4:00 pm",
    time: "30 mins"
  },
  {
    id: 5,
    idno: "Id 802",
    price: "$4764",
    date: "MAR/10/2018, ",
    timeframe : "12:00 pm to 4:00 pm",
    time: "30 mins"
  },
  {
    id: 6,
    idno: "Id 804",
    price: "$848",
    date: "MAR/10/2018, ",
    timeframe : "12:00 pm to 4:00 pm",
    time: "30 mins"
  }
];

var navigator=null;

class Scheduled extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      data,
      isModalVisible: false,
      isDatePicker: false,
      chosenDate: new Date(),
      availability: true,
      multiSliderValue: [3, 7]
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  onShow() {
    this.setState({ isDatePicker: !this.state.isDatePicker });
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  onCancel() {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      isDatePicker: false
    });
  }

  onSubmitInfo() {}
  onSortBy() {}

  onOrderBy() {}

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    });
  };
  showDatePicker = () => {
    if (this.state.isDatePicker) {
      return (
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
      );
    } else {
      return null;
    }
  };
  setAvailability() {
    this.setState({
      availability: !this.state.availability
    });
  }
  onClickRowItem(item)
  {
    const { navigate } = this.props;
    this.props.dispatch({type:'SET_ORDERDATA',data:item});
    navigate('AvailableOrders');
  }

  renderItem(data) {
    let { item, index } = data;
    return (
      <TouchableOpacity onPress={() => {this.onClickRowItem(item)}}>
        <View style={styles.itemBlock}>
          <View style={[styles.itemViewFirst,{flex:2}]}>
            <Text style={styles.itemName}>{item.idno}</Text>
            <Text style={styles.itemDate}>{item.date}{item.timeframe}</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'flex-end'}}>
            <View style={[styles.itemViewSecond]}>
              <Image
                style={styles.clockIcon}
                source={Constants.Images.driver.clock}
              />
              <Text style={[styles.itemTime,{alignSelf:'center'}]}>{item.time}</Text>
            </View>
            <View >
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let {navigate}=this.props;
    navigator=navigate;
     //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.searchView}>
            <Image
              style={styles.searchIcon}
              source={Constants.Images.driver.search}
            />
            <TextInput underlineColorAndroid='transparent' style= {Platform.OS === 'ios' ? styles.searchInput : styles.searchInputAndroid} placeholder={"Search"} />
          </View>
          <TouchableOpacity onPress={this._toggleModal}>
            <Image
              style={styles.filterIcon}
              source={Constants.Images.driver.filter}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: Constants.Colors.White }}>
            <TouchableOpacity onPress={() => this.onCancel()}>
              <Image
                style={[styles.crossIcon]}
                source={Constants.Images.user.cross}
              />
            </TouchableOpacity>
            <Text style={styles.filterTitle}>{"FILTER AND SORT"}</Text>
            <View style={styles.filterBody}>
              <Text style={styles.filterAmount}>
                {"Filter by order amount ($10-$29)"}
              </Text>
              <MultiSlider
                containerStyle={styles.sliderStyle}
                trackStyle={styles.sliderTrace}
                selectedStyle={{ backgroundColor: "#53C8E5" }}
                values={[
                  this.state.multiSliderValue[0],
                  this.state.multiSliderValue[1]
                ]}
                sliderLength={280}
                onValuesChange={this.multiSliderValuesChange}
                min={0}
                max={10}
                step={1}
                allowOverlap
                snapped
              />

              <Text style={styles.filterDate}>{"Filter by date"}</Text>

              <View style={styles.datesView}>
                <View style={styles.dateFrom}>
                  <Text style={styles.filterAmount}>{"From"}</Text>
                </View>
                <View style={styles.dateTo}>
                  <Text style={styles.filterAmount}>{"To"}</Text>
                </View>
              </View>
              <View style={styles.pickerRootView}>
                <TouchableOpacity onPress={() => this.onShow()}>
                  <View style={styles.pickerView}>
                    <Text style={styles.pickerDateText}>{"MM/DD/YY"}</Text>
                    <Image
                      style={styles.calendarIcon}
                      source={Constants.Images.driver.calendar}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickerTouchView}
                  onPress={() => this.onShow()}
                >
                  <View style={styles.pickerView}>
                    <Text style={styles.pickerDateText}>{"MM/DD/YY"}</Text>
                    <Image
                      style={styles.calendarIcon}
                      source={Constants.Images.driver.calendar}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.onSortBy()}>
                <View
                  style={{
                    padding: 3,
                    marginVertical:
                      Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: Constants.Colors.Blue,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text style={[styles.rowText]}>{"Sort By"}</Text>
                  <Image
                    source={Constants.Images.driver.down}
                    style={styles.dropIcon}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onOrderBy()}>
                <View
                  style={{
                    padding: 3,
                    marginVertical:
                      Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: Constants.Colors.Blue,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text style={[styles.rowText]}>{"Order By"}</Text>
                  <Image
                    source={Constants.Images.driver.down}
                    style={styles.dropIcon}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.flexRow}>
                <View style={{ flex: 1 }}>
                  <SubmitButton
                    onPress={() => this.onSubmitInfo()}
                    text={"Ok"}
                    style={[styles.ButtonStyle, { backgroundColor: "#53C8E5" }]}
                    textStyle={[{ fontSize: 17 }]}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SubmitButton
                    onPress={() => this.onCancel()}
                    text={"CANCEL"}
                    style={styles.ButtonStyle}
                    textStyle={[{ fontSize: 17 }]}
                  />
                </View>
              </View>
            </View>
            {this.showDatePicker()}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  rightButtonNav: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  headerView: {
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Constants.Colors.White,
    borderWidth: 1,
    borderBottomColor: Constants.Colors.LightGray
  },
  searchView: {
    flex: 1,
    flexDirection: "row",
    padding: Constants.BaseStyle.PADDING / 100 * 10,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    borderWidth: 1,
    borderColor: Constants.Colors.LightGray,
    alignItems: "center"
  },
  searchInput: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: "100%",
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3
  },
  searchInputAndroid: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: "100%",
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3
  },
  itemBlock: {
    flexDirection: "row",
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: Constants.Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.LightGray
  },
  // itemPdf: {
  //   fontSize: 16,
  //     color:'#000',
  //     paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*2,
  // },
  itemName: {
    fontSize: 18,
    fontWeight: "700",
    color: Constants.Colors.Blue
  },
  itemViewFirst: {
    flex: 1
  },
  itemViewSecond: {
    flexDirection: "row",
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    alignItems: 'flex-end',
    justifyContent:'flex-end'
  },
  itemTime: {
    fontSize: 14,
    color: Constants.Colors.Blue
  },
  itemDate: {
    fontSize: 16,
    color: Constants.Colors.Gray
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: Constants.Colors.Blue,
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 0.8,
    textAlign:'right',
  },
  // pdfIcon: {
  //   width: Constants.BaseStyle.DEVICE_WIDTH/100*7,
  //   height:  Constants.BaseStyle.DEVICE_HEIGHT/100*4,
  //   padding:Constants.BaseStyle.PADDING/100*2,
  // },
  clockIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  filterIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  crossIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Constants.Colors.Blue,
    textAlign: "center",
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3.2
  },
  filterAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3
  },
  sliderStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3
  },
  sliderTrace: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
    backgroundColor: "silver"
  },
  filterDate: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5
  },
  filterBody: {
    paddingHorizontal: Constants.BaseStyle.PADDING,
    paddingBottom: Constants.BaseStyle.PADDING
  },
  datesView: {
    flexDirection: "row"
  },
  dateFrom: {
    flex: 1
  },
  dateTo: {
    flex: 1,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10
  },
  pickerRootView: {
    flexDirection: "row"
  },
  pickerTouchView: {
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10
  },
  pickerView: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Constants.Colors.LightGray
  },

  pickerDateText: {
    fontSize: 15,
    fontWeight: "600",
    color: Constants.Colors.Blue
  },
  calendarIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
  },

  rowText: {
    color: Constants.Colors.Blue,
    fontWeight: "600"
  },

  dropIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
  },
  flexRow: {
    flexDirection: "row"
  },

  ButtonStyle: {
    borderWidth: 1,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*0.5,
    borderRadius: 5
  }
});

export default connect(state => ({orderstate: state.OrdersHandleReducer}))(Scheduled);
