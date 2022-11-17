import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SearchBar } from "@rneui/themed";
import React, { useState, useContext } from "react";
// import {  } from "@react-native-material/core"; //List items from https://www.react-native-material.com/docs/components/list-item
import InformationModal from '../../components/Information';
import { ListItem, Avatar } from '@rneui/themed';
// for theming page: react useContext and below
import themeContext from '../../config/themeContext';



function HomeScreen({navigation}){

  // theme
  const theme = useContext(themeContext);

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
    <View style={{backgroundColor: theme.theme == "dark" ? "#000000" : "gray"}}>
      
    {/* <View> */}
    <InformationModal></InformationModal> 
      <ScrollView style={{position:'relative',top:40,marginBottom:90, backgroundColor: theme.background}}>
      <Text style={{...styles.text, left:20,fontWeight:'bold', fontSize:30, color: theme.color}}>Lego Pieces</Text>
      <Text style={{...styles.text, color: theme.color}}>Please select the piece you would like to identify</Text>
      <SearchBar onChangeText={updateSearch} value={searchTerm} placeholder="Search" lightTheme="true" platform="ios"containerStyle={{position:'relative',margin:16}}/>
      
      {/* iterate over the json file and print one by one */}
      {results.map(item => (
          <ListItem  key = {item.PartID} onPress={() => navigation.navigate('Lego',{ item:item})}
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

const styles = StyleSheet.create({
  text:{
    position:'relative',
    left:20, 
    marginBottom:10, 
    fontSize:15,
  }
});

export default HomeScreen