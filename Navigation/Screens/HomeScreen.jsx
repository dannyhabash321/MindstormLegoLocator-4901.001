import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { ListItem, Avatar } from "@react-native-material/core"; //List items from https://www.react-native-material.com/docs/components/list-item
import ModalTester from '../../components/Information';

function HomeScreen({navigation}){
 //array to hold json lego db
  const legos = require('../../assets/database.json')
  //search term that is typed in the search bar
  const [searchTerm, setSearchTerm] = useState("")

  //updates searching if letters are typed in the search bar
  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  };

  //function that searches and filters the array based on search request
  let results = legos.filter(function(lego) {
    //if user types in spaces
    if (searchTerm.trim().length == 0){
      return legos
    }
      
    //searching based on part name
    let partName = lego.PartName.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1
    //searching based on partID
    let partID = lego.PartID.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1
    //searching based on color
    let color = lego.Colour.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1
    
    //return concatenated results
    return partName+partID+color;
  });

 return(
    <View backgroundColor = "#ffffff">
    <ModalTester></ModalTester> 
      <ScrollView style={{position:'relative',top:40, }}>
      <Text style={{position:'relative',left:20, marginBottom:10,fontWeight:'bold', fontSize:30 }}>Lego Pieces</Text>
      <Text style={{position:'relative',left:20, marginBottom:10, fontSize:15 }}>Please select the piece you would like to identify</Text>
      <SearchBar onChangeText={updateSearch} value={searchTerm} placeholder="Search" lightTheme="true" platform="ios"containerStyle={{position:'relative',margin:16}}/>
      
      {/* iterate over the json file and print one by one */}
      {results.map(item => (
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