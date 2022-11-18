import { ActivityIndicator,FlatList,List,StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image, SearchBar, ListItem, Avatar } from "@rneui/themed";
import { Divider } from "@react-native-material/core";
import React, { useState, useContext } from "react";
// import {  } from "@react-native-material/core"; //List items from https://www.react-native-material.com/docs/components/list-item
import InformationModal from '../../components/Information';
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
    // <View style={{backgroundColor: theme.theme == "dark" ? "#0f2b45" : "gray"}}>
    
    <View style={{backgroundColor: theme.background}}>
    <InformationModal></InformationModal> 
    
      <Text style={{...styles.text, left:20,fontWeight:'bold', fontSize:30, color: theme.color}}>Lego Pieces</Text>
      <Text style={{...styles.text, color: theme.color}}>Please select the piece you would like to identify</Text>
      <SearchBar onChangeText={updateSearch} value={searchTerm} placeholder="Search" lightTheme="true" platform="ios"containerStyle={{position:'relative',margin:16}}/>
      <ScrollView style={{position:'relative',top:40,marginBottom:90, backgroundColor: theme.background}}>
      {/* iterate over the json file and print one by one */}
     
      <FlatList
        data={results}
        style={styles.list}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.ImageURL}} containerStyle={styles.item} PlaceholderContent={<ActivityIndicator />}/>
        )}
      />

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
  },
  item: {
    aspectRatio: 1,
    borderRadius: 1,
    borderWidth: 1,
    marginRight: 1,
    marginTop: 1,
    width: '100%',
    flex: 1,
  },
  list: {
    width: '100%',
    
    
  },
});

export default HomeScreen