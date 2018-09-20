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
  TouchableOpacity,
  FlatList
} from 'react-native';

import Constants from "../../constants";

export default class MessagesList extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      messagesData:[{name:'Katrina Kate',description:'When an unknown printer took a galley of type and scrambled it to make a type specimen book.',date:'MAR 2018, 25 12:22',image:Constants.Images.user.female},
                    {name:'Johe Doe',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',date:'MAR 2018, 25 12:22',image:Constants.Images.user.male},
                    {name:'Katrina Kate',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',date:'MAR 2018, 25 12:22',image:Constants.Images.user.female},
                    {name:'Michele',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',date:'MAR 2018, 25 12:22',image:Constants.Images.user.male},
                    {name:'Maria Doe',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',date:'MAR 2018, 25 12:22',image:Constants.Images.user.female},            
                ]
    }
  }

  messagesList(item){
    const { navigate } = this.props.navigation;
    return(
      <TouchableOpacity onPress={()=>navigate('Chat')} style={styles.listContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.header}>
          <View style={styles.innerHeading}>
            <Text style={styles.boldText}>{item.name}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.messagesData}
        renderItem={({item})=>this.messagesList(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection:'row',
    padding:Constants.BaseStyle.PADDING * .5,
    borderBottomWidth:1,
    borderBottomColor:Constants.Colors.BlurGrey
  },
  imageContainer:{
    flex:.2,
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8,
    width:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8,
    borderRadius:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
  },
  header:{
    flex:.8
  },
  innerHeading:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  boldText:{
    fontSize:20,
    fontWeight:'700'
  },
  date:{
    fontSize:10,
    color:Constants.Colors.BlurGrey
  }
});
