import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SearchBar, ListItem, Avatar } from "@rneui/themed";
import { Divider } from "@react-native-material/core";
import React, { useState, useContext } from "react";
import InformationModal from '../../components/Information';
import SettingsModal from '../../components/SettingsPop';
// for theming page: react useContext and below
import themeContext from '../../config/themeContext';
import Feather from 'react-native-vector-icons/Feather'; // Icon from https://github.com/oblador/react-native-vector-icons



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
    <View style={{backgroundColor: theme.background}}>
    
    
    {/* <Text style={{fontSize:20,position:'absolute',left:-5,bottom:-3,textAlign:'center'}}>Menu</Text> */}
    
    <InformationModal></InformationModal>
    <SettingsModal></SettingsModal>
     
      <ScrollView style={{position:'relative', marginBottom:90, backgroundColor: theme.background}}>

      <Text style={{...styles.text, left:20,fontWeight:'bold', fontSize:30, color: theme.color}}>Lego Pieces</Text>
      <Text style={{...styles.text, color: theme.color}}>Please select the piece you would like to identify</Text>
      <SearchBar onChangeText={updateSearch} value={searchTerm} placeholder="Search" platform="ios" containerStyle={{position:'relative',margin:16, backgroundColor: theme.background}}/>
      <Divider style={{ marginTop: 10,marginLeft:20,marginRight:20,}}/>
      {/* iterate over the json file and print one by one */}
      
      {results.map(item => (
          <ListItem key = {item.PartID} onPress={() => navigation.navigate('Lego',{ item:item})} containerStyle={{backgroundColor: theme.theme == "dark" ? "#000000" : theme.background}} bottomDivider>
          <Avatar size={70} source={{ uri: item.ImageURL }} />
          <ListItem.Content>
            <ListItem.Title style={{color: theme.color}}>{item.PartName}</ListItem.Title>
            <ListItem.Subtitle style={{color: theme.color}}>{'Category: ' + item.Category}</ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
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