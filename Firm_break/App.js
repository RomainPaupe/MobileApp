import { NavigationContainer } from '@react-navigation/native'
import { UserProvider } from './Data/Data';
import MyStack from './Navigation/Stack';


export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <MyStack></MyStack>
      </NavigationContainer>
    </UserProvider>
  );
}
