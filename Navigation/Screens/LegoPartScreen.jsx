import { StyleSheet, Text, View, ScrollView,Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Divider} from 'react-native-paper';

function LegoPartScreen({ route, navigation}){
    //params to be passed from homepage
    const partId = route.params.partId;
    const imageSource = '../../assets/exampleLego.png'
    //page html
    return(
        <View style={styles.container}>
            <Icon.Button onPress={() => navigation.goBack()} name="left" style={styles.backButton} color="#ff0000" backgroundColor="#ffffff" size="30"> 
                <Text style={{fontSize: 25, color:"#ff0000" }}>Home</Text>
            </Icon.Button>
            <View style={styles.partContainer}>
                <Text style={styles.title}>Big Bossman Lego #{partId}</Text>
                <Image style={styles.image} source={require(imageSource)} />
            </View>
            
            <View style={{padding: 15}}>
                <Text style={styles.infoText}>Set: Lego EV3</Text>
                <Divider style={{height: 1.5}}/>
                <Text style={styles.infoText}>Color: Yellow</Text>
                <Divider style={{height: 1.5}}/>
                <Text style={styles.infoText}>Quantity: 20</Text>
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
        bottom:"1%",
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
        fontSize: 25,
        padding: 15,
        fontWeight: "bold"
    },
    
    image:{
        top: "10%",
        width:"41%",
        height: "55%"
    },
    title:{
        position: "relative",
        top: "10%",
        fontSize: 30,
        padding: 10,
        textAlign: "center",
        fontWeight: "bold"
        
    },
    partContainer:{
        alignItems: 'center',
        width: "85%",
        height: "50%",
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