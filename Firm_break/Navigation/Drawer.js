import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { navOptions } from './Option'
import HomeScreen from '../Screen/Home'
import AddBreakScreen from '../Screen/AddBreak'
import ProfileScreen from '../Screen/Profile'
import StatScreen from '../Screen/Stat'
import InfoScreen from '../Screen/Info'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Drawer = createDrawerNavigator()

export const MyDrawer = () => {
    const nav = useNavigation()
    return(
        <Drawer.Navigator

        screenOptions={()=>navOptions(nav)}
        drawerContent={(props) =>{
            return(
                <SafeAreaView style={{flex:1}}>
                    <Text style={[styles.text, {fontSize: 35}]}>8<Text style={{color:'#525A4F'}}>P</Text>ool</Text>
                    <DrawerItemList {...props}/>
                    <View style={styles.container}>
                        <Text style={styles.footerText}>by Romain Paupe</Text>
                    </View>
                </SafeAreaView>
            )
        }}> 
            <Drawer.Screen name='Home' component={HomeScreen} options={{
                title:"Home", 
                drawerIcon : ()=> <Ionicons name="home-outline" size={22}/>,
            }}/>
            <Drawer.Screen name='Break' component={AddBreakScreen}options={{
                title:"Add a break", 
                drawerIcon : ()=> <Ionicons name="add-circle-outline" size={22}/>,
            }}/>
            <Drawer.Screen name='Profile' component={ProfileScreen}options={{
                title:"Profile", 
                drawerIcon : ()=> <Ionicons name="person-outline" size={22}/>,
            }}/>
            <Drawer.Screen name='Stat' component={StatScreen}options={{
                title:"Stats", 
                drawerIcon : ()=> <Ionicons name="stats-chart-outline" size={22}/>,
            }}/>
            <Drawer.Screen name='Info' component={InfoScreen}options={{
                title:"About us", 
                drawerIcon : ()=> <Ionicons name="information-outline" size={22}/>,
            }}/>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    footerText: {
        fontSize: 14, 
        marginBottom:10,
        color:'grey',
      },  
    text: {
        alignSelf:'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical:20,
      },
})