import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; //Icon from https://github.com/oblador/react-native-vector-icons
import EvilIcons from 'react-native-vector-icons/EvilIcons';// Icon from https://github.com/oblador/react-native-vector-icons
import Feather from 'react-native-vector-icons/Feather'; // Icon from https://github.com/oblador/react-native-vector-icons
import { StatusBar } from 'expo-status-bar';
//old function no longer used
function NavBar(){
    return (
        <View style={styles.container}>
    
            <View>
                <Entypo.Button name="home" size={40} color="#ff0000" backgroundColor={"#ffffff"} />
                <Text style={styles.home_button_text}>Home</Text>
            </View>
            
            <View>
                <EvilIcons.Button name="camera" size={50} color="#808080" backgroundColor={"#ffffff"} />
                <Text style={styles.camera_button_text}>Camera</Text>
            </View>

            <View>
                <Feather style={{ marginBottom: 8 }} name="menu" size={30} color="#808080" backgroundColor={"#ffffff"} />
                <Text style={styles.menu_button_text}>Menu</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
  
      position:'relative',
      top:60,
      //paddingBottom:30,
      flexDirection:'row',
      backgroundColor: '#fff',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
    },
    home_button_text:{
      fontSize:20, 
      position:'relative',
      left:-5,
      bottom:10,
      textAlign:'center',
      color:'#ff0000',
    },
    camera_button_text:{
      fontSize:20, 
      position:'relative',
      left:-5,
      bottom:10,
      textAlign:'center',
      color:"#808080",
    },
    menu_button_text:{
      fontSize:20, 
      position:'relative',
      left:-10,
      bottom:10,
      textAlign:'center',
      color:"#808080",
    },
    
  });


  export default NavBar;
  
  
