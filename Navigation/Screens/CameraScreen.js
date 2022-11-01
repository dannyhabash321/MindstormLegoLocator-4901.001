import { color } from '@rneui/base';
import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { Surface } from 'react-native-paper';
import { Stack, Button,FAB } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/AntDesign';
function CameraScreen({navigation}){
    return(
        <View style={styles.container}>
         <Icon.Button name="left" style={styles.button} color="#ff0000" backgroundColor="#ffffff" size="30"> 
         <Text style={{fontSize: 25, color:"#ff0000" }}>Home</Text>
        </Icon.Button>
        <View style={styles.main}>
        
        <Stack fill center spacing={10}>
        <Surface
        elevation={4}
        style={{
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 300,
        borderRadius:20,
        marginTop:50
      }}
    >
      <Text style={{  fontSize: 32, textAlign: "center",fontWeight:"bold", margin:10}}>Would you like to use Picture Mode or Live Feed Mode?</Text>
        </Surface>
        <Stack fill center spacing={50}>
    <FAB variant='extended' color="#ff0000" label="Picture Mode" 
    labelStyle={{fontSize: 20, textAlign: "center",fontWeight:"bold",color:"#ffffff"}}
    contentContainerStyle={{width:300, alignItems:"center",justifyContent:"center"}} />
    <FAB variant='extended' color="#ff0000" label="Live Feed Mode" 
    labelStyle={{fontSize: 20, textAlign: "center",fontWeight:"bold",color:"#ffffff"}}
    contentContainerStyle={{width:300, alignItems:"center",justifyContent:"center"}} />
    </Stack>
  </Stack>
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
    }
  });
export default CameraScreen