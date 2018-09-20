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
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Background from "../../../components/common/Background";
import Constants from "../../../constants";
//import StarRating from "../../../components/driver/StarRating";
//import Icon from "react-native-vector-icons/FontAwesome";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';

class CustomerProfileDrawer extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      available: true,
      avatarSource: null,
      imagesArray:[],
      token:null,//props.user.userDetails.token
    };
    console.log('here are profile drawer props ******* ',props)
  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    });
  }
  editCoverImage() {}
  openImagePicker() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        console.log("after uri..... ", response.uri);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.setState({
        //   avatarSource: source
        // });
        let arrImg = this.state.imagesArray;
        this.setState({avatarSource: source},()=>{
          arrImg.push(this.state.avatarSource);
           this.forceUpdate();
          console.log('state for image inside image picker ******** ',this.state.imagesArray)
        })
        //console.log(" image source  ***********  ", source);

      }
    });
  }

  // showActionSheet = () => this.actionSheet.show()
  // getActionSheetRef = ref => (this.actionSheet = ref)

  //handlePress = index => this.setState({ selected: index })

  logout(){
    let context = this;
    context.props.UserActions.logout(this.state.token);
  }

  render() {
    //const { ImgArr } = this.state

    let ImgArr = this.state.imagesArray;
   // console.log(" array for images inside render ******* ", ImgArr);
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.rootContainer}>
            <ImageBackground
              source={{
                uri:
                  "https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg"
              }}
              style={styles.imageCover}
            >

            </ImageBackground>
            <View style={styles.subContainer}>
              <Image
                style={styles.imageProfile}
                source={{
                  uri:
                    "https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg"
                }}
              />
              <View>
                <Text style={[styles.nameText]}>Chris Evans</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text  style={[styles.reviewText]}>
               <Text style={[styles.reviewText,{fontWeight: "800",}]}>45 </Text>
                  REVIEWS</Text>
                  <Text

                    style={[
                      styles.reviewText,
                      { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }
                    ]}
                  >
                   <Text style={[styles.reviewText,{fontWeight: "800",}]}>50 </Text>
                   FOLLOWERS
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: 20 }}>
            {/*<StarRating
              rating={"3"}
              iconWidth={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
              iconHeight={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
            />*/}
            <View style={{ flexDirection: "row"}}>
              <View style={{flex:0.5}}>
                <Text style={[styles.orangeText]}>78
                <Text
                  style={[
                    styles.reviewText,
                    { color: Constants.Colors.LightGray }
                  ]}
                >
                  Orders Delivered
                </Text></Text>
              </View>
              <View
                style={{flex:0.5,alignItems:'flex-end'}}
              >
                <Text
                  style={[
                    styles.reviewText,
                    { color: Constants.Colors.Orange }
                  ]}
                >
                  Open Driver App
                </Text>
              </View>
            </View>
            <Text style={[styles.aboutText]}>ABOUT US</Text>
            <Text>
              {
                "Lorem Ipsumis simYo pluydaumre moytfefxto fyp.rintingand typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and"
              }
            </Text>
            <Text style={[styles.aboutText]}>IMAGE GALLERY</Text>

            <View style={styles.gallaryImagesView}>
              {ImgArr.map((each, index) => {
                console.log('each ******* ',each)
                return (
                  <Image
                    key={index}
                    source={{ uri: each.uri }}
                    style={styles.gallaryImages}
                    resizeMode={"cover"}
                  />
                );
              })}
              <TouchableOpacity
                style={styles.cameraImages}
                onPress={() => this.openImagePicker()}
              >
                <Image source={Constants.Images.driver.camera} style={styles.insideCamera}  resizeMode={'contain'} />
              </TouchableOpacity>
            </View>

          </View>
            <TouchableOpacity style={{marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2}} onPress={()=>this.logout()}>
              {/* <Text style={{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*5,}}>Logout</Text> */}
              <Text style={styles.logoutText}>LOGOUT</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

  },
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 34,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // position: "absolute",
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  rootReviews: { flexDirection: "row", flex: 1, alignItems: "center" },

  editIcon: {
    backgroundColor:'transparent',
    position: "absolute",
    top: 10,
    right: 10,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  imageCover: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25,
    width: Constants.BaseStyle.DEVICE_WIDTH
  },
  imageProfile: {

    //backgroundColor: "red",
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 35,
    borderWidth: 2,
    borderColor: Constants.Colors.White
  },
  nameText: {
    color: Constants.Colors.Blue,
    fontWeight: "800",
    fontSize: 19,
    paddingHorizontal: Constants.BaseStyle.PADDING * 0.2,
      paddingVertical: Constants.BaseStyle.PADDING * 0.4,
  },
  reviewText: {
    color: Constants.Colors.Blue,
    fontWeight: "500",
    fontSize: 14,
    //paddingLeft: Constants.BaseStyle.PADDING * 0.2
  },
  aboutText: {
    color: Constants.Colors.Blue,
    fontWeight: "600",
    fontSize: 14,
    paddingVertical: Constants.BaseStyle.PADDING * 0.4
  },
  orangeText: {
    color: Constants.Colors.Orange,
    fontWeight: "800",
    fontSize: 16
  },
  gallaryImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5
  },
  cameraImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Constants.Colors.LightGray,
    borderWidth: 1
  },
  insideCamera:{
    //tintColor:Constants.Colors.Blue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8,
  },
  gallaryImagesView: {
    //justifyContent:'center',
    flexWrap: "wrap",
    flexDirection: "row"
  },
  logoutText: {

    bottom: 10,
    color: Constants.Colors.Blue,
    fontWeight: "600",
    fontSize: 14,
    backgroundColor: Constants.Colors.White,
    paddingVertical: Constants.BaseStyle.PADDING * 0.5,
    marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*8
  }
});


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfileDrawer);
