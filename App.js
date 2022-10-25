import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'; //Icon from https://github.com/oblador/react-native-vector-icons
import EvilIcons from 'react-native-vector-icons/EvilIcons';// Icon from https://github.com/oblador/react-native-vector-icons
import Feather from 'react-native-vector-icons/Feather'; // Icon from https://github.com/oblador/react-native-vector-icons
import { ListItem, Avatar } from "@react-native-material/core"; //List items from https://www.react-native-material.com/docs/components/list-item
import { SearchBar } from "@rneui/themed";
export default function App() {
  return (
   <View>
   <SearchBar placeholder="Search" lightTheme="true" platform="ios"containerStyle={{position:'relative',top:50,margin:16}}/>
   
   <View style={{height:650 }}>
    <ScrollView style={{position:'relative',top:40, }}>
    <Text style={{position:'relative',left:20, marginBottom:10,fontWeight:'bold', fontSize:30 }}>Lego Pieces</Text>
    <TouchableWithoutFeedback>
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/9339.jpg" }} />
      }
      title="Brunch this weekend?"
      secondaryText="I'll be in your neighborhood doing errands this…"
      onPress={() => {
        alert('You tapped the button!');
      }}
    />
    </TouchableWithoutFeedback>
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4550348.jpg" }} />
      }
      title="Summer BBQ"
      secondaryText="Wish I could come, but I'm out of town this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/6244915.jpg" }} />
      }
      title="Oui Oui"
      secondaryText="Do you have Paris recommendations? Have you ever…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/9339.jpg" }} />
      }
      title="Brunch this weekend?"
      secondaryText="I'll be in your neighborhood doing errands this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4550348.jpg" }} />
      }
      title="Summer BBQ"
      secondaryText="Wish I could come, but I'm out of town this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/6244915.jpg" }} />
      }
      title="Oui Oui"
      secondaryText="Do you have Paris recommendations? Have you ever…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/9339.jpg" }} />
      }
      title="Brunch this weekend?"
      secondaryText="I'll be in your neighborhood doing errands this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4550348.jpg" }} />
      }
      title="Summer BBQ"
      secondaryText="Wish I could come, but I'm out of town this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/6244915.jpg" }} />
      }
      title="Oui Oui"
      secondaryText="Do you have Paris recommendations? Have you ever…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/9339.jpg" }} />
      }
      title="Brunch this weekend?"
      secondaryText="I'll be in your neighborhood doing errands this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4550348.jpg" }} />
      }
      title="Summer BBQ"
      secondaryText="Wish I could come, but I'm out of town this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar image={{ uri: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/6244915.jpg" }} />
      }
      title="Oui Oui"
      secondaryText="Do you have Paris recommendations? Have you ever…"
    />
    </ScrollView>
    </View>
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
//TO-DO:
//-Navigating Between Screens :https://reactnative.dev/docs/navigation
