//import * as React from 'react';
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { Switch } from "@react-native-material/core";

import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../../config/themeContext";

import ttsContext from "../../config/ttsContext";
/* Function SettingsScreen
   Purpose: Displays Settings
   Notes:
      Line 24: Displays Settings Title
      Line 25-37: Displays Dark Mode Switch
      Lines 38-41: Displays Enable Accessibility Features Switch
*/
function SettingsScreen({navigation}){
    const theme = useContext(themeContext);
    const [themeMode, setThemeMode] = useState(false);

    const ttsChoice = useContext(ttsContext);
    const [ttsMode, setTtsMode] = useState(false);

    return(
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Pressable onPress={() => navigation.goBack()} name="left" style={{...styles.backButton, backgroundColor: theme.theme == "dark" ? "#000000" : theme.background}} size="30"> 
                <Text style={{fontSize: 25, color:"#ff0000", left: 5 }}> {'<'} Home</Text>
            </Pressable>
            <Text style={{marginTop:100, marginLeft:30,fontSize:32, fontWeight:'bold', color: theme.color}}>Settings</Text>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:50}}>
            <Switch value={themeMode} onValueChange={(value) => {
              
              setThemeMode(value);
              EventRegister.emit("changeTheme", value);
              
              
              }} onPress={() => setThemeMode(!themeMode)}
            />
            
            
            
            <Text style={ {...styles.text, color: theme.color}}>Dark Mode</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:10}}>
            </View>

            <Text style={{marginTop:100, marginLeft:30,fontSize:32, fontWeight:'bold', color: theme.color}}>Accessibility Settings</Text>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:10}}>
            <Switch value={ttsMode} onValueChange={(value) => {
              
              setTtsMode(value);
              EventRegister.emit("changeTts", value);
              
              
              }} onPress={() => setTtsMode(!ttsMode)}
            />


            <Text style={ {...styles.text, color: theme.color}}>Text To Speech</Text>
            </View>

            
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:10,marginTop:350}}>
            
            
            <Text style={ {...styles.text, color: theme.color ,fontSize:12, fontWeight:'light'}}>LML is an app created by students 
           and is not sponsored or supported by LEGO® </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    button: {
        marginTop:50  
    },
    main:{
      flex:2,
      justifyContent: "center",
      alignItems: "center",
    },
    text:{
      marginLeft:10,
      fontSize:20,
    },
    backButton: {
      marginTop:50  
    },
  });
export default SettingsScreen