import { useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MyDrawer } from "./Drawer"
import CreateUserScreen from "../Screen/CreateUser"
import WelcomeScreen from "../Screen/Welcome"
import LoginScreen from "../Screen/Login"


const Stack = createStackNavigator();
const MyStack = () => {
    const navigator = useNavigation()
    return ( 
        <Stack.Navigator 
        screenOptions={{headerShown:false}}> 
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="CreateUser" component={CreateUserScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Drawer" component={MyDrawer} />
        </Stack.Navigator>
     );
}
 
export default MyStack;