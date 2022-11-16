//import * as React from 'react';
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Divider,Stack, Switch } from "@react-native-material/core";
function SettingsScreen({navigation}){
    const [checked, setChecked] = useState(true);
    const [enabled, setEnabled] = useState(true);
    return(
        
        <View style={styles.container}>
            <Text style={{marginTop:80,marginLeft:20,fontSize:24, fontWeight:'bold'}}>Instructions</Text>
            <Divider style={{ marginTop: 10,marginLeft:20,marginRight:20,}}/>

            <Divider style={{ marginTop: 30,marginLeft:20,marginRight:20,}}/>
            <Text style={{marginTop:30,marginLeft:20,fontSize:24, fontWeight:'bold'}}>Settings</Text>
            <Stack fill left spacing={20}>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:10}}>
            <Switch value={checked} onValueChange={() => setChecked(!checked)} onPress={() => setChecked(!checked)}/>
            <Text style={{marginLeft:10,fontSize:20,}}>Dark Mode</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center',marginLeft:30,marginTop:10}}>
            <Switch value={enabled} onValueChange={() => setEnabled(!enabled)} onPress={() => setEnabled(!enabled)}/>
            <Text style={{marginLeft:10,fontSize:20,}}>Enable Accessibility Features</Text>
            </View>
            </Stack>

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
        fontWeight:"bold"
    }
  });
export default SettingsScreen