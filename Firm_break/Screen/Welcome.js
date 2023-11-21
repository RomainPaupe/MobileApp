import { useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"

const WelcomeScreen = () => {
    const navigator = useNavigation()
    return ( 
        <View style={styles.view}>
            <View style={{alignItems:'center', paddingTop:80, paddingBottom:30,}}><Image source={require('../assets/Billard_Croquis.png')} style={styles.image}></Image></View>
            
            <Text style={styles.title}>Welcome {'\n'}to 8<Text style={{color:'#525A4F'}}>P</Text>ool</Text>
            <Text style={styles.description}>This application will give you the opportunity to regitser all the time you close a table and get some statistics on them !</Text>
            <View style={styles.connexion}> 
                <TouchableOpacity style={styles.button} onPress={()=>navigator.navigate('CreateUser')}>
                    <Text style={styles.buttonText}>Create an account</Text>
                </TouchableOpacity>
                <View style={styles.viewAccount}>
                    <Text style={styles.endingText}>Already have an account ? </Text> 
                    <TouchableHighlight onPress={()=> navigator.navigate('Login')}><Text style={{textDecorationLine: 'underline', color:'white'}}>Login</Text></TouchableHighlight>
                </View>
                
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor:'#6EB95B',
        padding:10,
    },

    image : {
        width: 300,
        height: 170,
        alignItems:'center',
    },

    title: {
        fontSize:50,
        fontWeight:'bold',
        color:'white',
        marginTop:10,
        marginBottom:20,
    },

    description: {
        textAlign: 'justify',
        color:'white',
        fontSize:15,
    },

    connexion:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },

    button: {
        width: '60%',
        height: 40,
        backgroundColor: '#525A4F',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginBottom:10,
    }, 

    buttonText:{
        color:'white',
        fontSize:18,

    },
    
    endingText: {
        color:'white',
    },

    viewAccount:{
        flexDirection:'row',
    },
})
 
export default WelcomeScreen;