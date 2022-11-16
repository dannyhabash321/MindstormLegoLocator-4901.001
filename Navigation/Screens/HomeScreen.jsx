import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SearchBar } from "@rneui/themed";
import React from "react";
import { ListItem, Avatar } from "@react-native-material/core"; //List items from https://www.react-native-material.com/docs/components/list-item
import ModalTester from '../../components/Information';

function HomeScreen({navigation}){
 //array to hold json lego db
 const legos = require('../../assets/database.json')
  
 return(
    <View backgroundColor = "#ffffff">

    <ModalTester></ModalTester> 
      <ScrollView style={{position:'relative',top:40, }}>
      <Text style={{position:'relative',left:20, marginBottom:10,fontWeight:'bold', fontSize:30 }}>Lego Pieces</Text>
      <Text style={{position:'relative',left:20, marginBottom:10, fontSize:15 }}>Please select the piece you would like to identify</Text>
      <SearchBar placeholder="Search" lightTheme="true" platform="ios"containerStyle={{position:'relative',margin:16}}/>
      
      {/* iterate over the json file and print one by one */}
      {legos.map(item => (
          <ListItem key = {item.PartID} onPress={() => navigation.navigate('Lego',{ item:item})}
            leadingMode="avatar"
            leading={
            <Avatar image={{ uri: item.ImageURL }} />
          }
            title= {item.PartName}
            secondaryText={'Category: ' + item.Category}
          />
      ))}

      </ScrollView>
      <StatusBar style="auto" />
      </View>
    );
}

export default HomeScreen