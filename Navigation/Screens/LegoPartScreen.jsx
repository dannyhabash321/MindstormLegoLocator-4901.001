import { StyleSheet,Modal, Text, View, ScrollView,Image, Pressable, Touchable, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Divider} from 'react-native-paper';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

// for theming page: react useContext and below
import themeContext from '../../config/themeContext';

function LegoPartScreen({ route, navigation}){
    //params passed from homepage
    const partId = route.params.item.PartID;
    const legoName = route.params.item.PartName;
    const legoSet = route.params.item.SetNumber;
    const legoColor = route.params.item.Colour;
    const legoQuantity = route.params.item.Quantity;
    const imageURL = route.params.item.ImageURL;
    // const legoSetCount = route.params.item.SetCount;
    const legoCategory = route.params.item.Category;
   
    //variable to toggle full screen image
    const [showModal, setShowModal] = useState(false)

    // theme
    const theme = useContext(themeContext);
    
    //page html
    return(

        <View style={{...styles.container, backgroundColor: theme.theme == "dark" ? "#282C34" : theme.background}}>
            {/* modal not present until photo is clicked */}
            <Modal 
                    animationType="slide"
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                    alert("Modal has been closed.");
                    setModalVisible(!showModal);
                    }}
            > 
                <View style={{ backgroundColor: "black"}}>
                    <Pressable
                    
                        style={[styles.button, styles.buttonClose]}
                        onTouchStart={() => setShowModal(!showModal)}
                    >
                    <Image
                        style={{ width: '100%', height: "100%", resizeMode: 'contain' }}
                        source={{ uri: imageURL }}
                    />
                    </Pressable>
                </View>
            </Modal>
            
            
            <Pressable onPress={() => navigation.goBack()} name="left" style={{...styles.backButton, backgroundColor: theme.theme == "dark" ? "#282C34" : theme.background}} size="30"> 
                <Text style={{fontSize: 25, color:"#ff0000", left: 5 }}> {'<'} Home</Text>
            </Pressable>

            <View style={styles.partContainer}>
                <Text style={{...styles.title}}>{legoName} #{partId}</Text>
                
                <TouchableOpacity onPress = {() => setShowModal(true)}>
                    <Image style={styles.image}
                        source={{
                        uri: imageURL,
                        }}
                    />
                </TouchableOpacity>

                
            </View>
            
            <View style={{padding: 15}}>
                <Text style={{...styles.infoText, color: theme.color}}>{'Set #: ' + legoSet} </Text>
                <Divider style={{height: 1.5}}/>
                <Text style={{...styles.infoText, color: theme.color}}>{'Color: ' + legoColor}</Text>
                <Divider style={{height: 1.5}}/>
                <Text style={{...styles.infoText, color: theme.color}}>{'Quantity: ' + legoQuantity}</Text>
                <Divider style={{height: 1.5}}/>
                <Text style={{...styles.infoText, color: theme.color}}>{'Category: ' + legoCategory}</Text>
                {/* <Divider style={{height: 1.5}}/>
                <Text style={{...styles.infoText, color: theme.color}}>{'Set Count: ' + legoSetCount}</Text> */}
            </View>

            <Pressable style={styles.locateButton} onPress={() => navigation.navigate('Camera')}>
                <Text style={styles.locateText}>Locate</Text>
            </Pressable>

        </View>
    )
}

//page styling
const styles = StyleSheet.create({

    locateButton: {
        position: "absolute",
        top:"90%",
        left: "10%",
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: "9%",
        borderRadius: 50,
        backgroundColor: "#ff0000",
    },
    locateText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    
    infoText:{
        fontSize: 22,
        padding: 15,
        fontWeight: "bold"
    },
    image:{
        top: "3%",
        left: "5%",
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
        objectfit: "contain"
    },
    title:{
        position: "relative",
        top: "5%",
        fontSize: 25,
        padding: 10,
        textAlign: "center",
        fontWeight: "bold"
        
    },
    partContainer:{
        // alignItems: 'center',
        width: "85%",
        height: "37.5%",
        backgroundColor: '#ffffff',
        marginTop: 15,
        marginLeft: "7.5%",
        borderRadius:  50,
        shadowColor: '#000',
        shadowOffset: { width: -1, height: 9 },
        shadowOpacity: .5,
        shadowRadius: 8,  
        
    },
    
    container: {
      flex: 1,
      backgroundColor: '#fff',

    },
    backButton: {
        marginTop:50  
    },

  });

export default LegoPartScreen