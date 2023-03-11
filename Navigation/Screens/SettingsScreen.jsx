//import * as React from 'react';
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View} from 'react-native';
import { Switch } from "@react-native-material/core";

import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../../config/themeContext";

/* Function SettingsScreen
   Purpose: Displays Settings
   Notes:
      Line 24: Displays Settings Title
      Line 25-37: Displays Dark Mode Switch
      Lines 38-41: Displays Enable Accessibility Features Switch
*/
function SettingsScreen({navigation}){
    const [enabled, setEnabled] = useState(true);
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);

    return(
        <View style={[styles.container, {backgroundColor: theme.background}]}>

            <Text style={{marginTop:100, marginLeft:30,fontSize:32, fontWeight:'bold', color: theme.color}}>Settings</Text>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:50}}>
            <Switch value={mode} onValueChange={(value) => {
              
              setMode(value);
              EventRegister.emit("changeTheme", value);
              
              
              }} onPress={() => setMode(!mode)}/>
            
            
            
            <Text style={ {...styles.text, color: theme.color}}>Dark Mode</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:10}}>
            <Switch value={enabled} onValueChange={() => setEnabled(!enabled)} onPress={() => setEnabled(!enabled)}/>
            <Text style={ {...styles.text, color: theme.color}}>Enable Accessibility Features</Text>
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
    }
  });
export default SettingsScreen