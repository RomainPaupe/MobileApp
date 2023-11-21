import { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native" 
import { userContext } from '../Data/Data'
import { useNavigation } from '@react-navigation/native'

export const navOptions = ({nav}) => {
    const [user] = useContext(userContext)
    const navigator = useNavigation()
    return {
        headerStyle:{
            backgroundColor:'#525A4F',
            height: 80,
        },

        headerTintColor: 'white',
        headerTitle: () => <Text style={styles.text}>8<Text style={{color:"#4CC16D"}}>P</Text>ool</Text>,
        headerRight: () => (
        <TouchableOpacity onPress={()=>navigator.navigate("Profile")}>
            <Image source={{uri : user.profilePicture}} style={{borderRadius:200, height:40, width:40, marginHorizontal: 12}}/>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        color:"white", 
        fontSize: 30, 
        fontWeight:"bold",
        padding: 10,
    },
})
