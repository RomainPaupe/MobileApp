import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import { userContext } from '../Data/Data';
import { useNavigation } from '@react-navigation/native';

const CreateUserScreen = () => {
  const navigator = useNavigation();
  const [fColor, setFColor] = useState({
    firstName: 'white',
    lastName: 'white',
    email: 'white',
    password: 'white',
  });
  const [result, setResult] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');
  const [user, setUser] = useContext(userContext);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleButton = async () => {
    
    try {
      const response = await fetch(
        `https://romain-sigfox-sparkin-project.online/Firm_Break/user/addUser?firstName=${newUser.firstName}&lastName=${newUser.lastName}&password=${newUser.password}&email=${newUser.email}`,
        {
          method: 'GET',
        }
      );

      const responseJson = await response.json();
      console.log(responseJson);
      setJsonResponse(responseJson);

      if (responseJson.success === false) {
        setResult('Fill-up all the informations correctly');
        let newFColor = {
          firstName: 'white',
          lastName: 'white',
          email: 'white',
          password: 'white',
        };

        let newNewUser = { ...newUser };

        for (let i = 0; i < responseJson.comment.length; i++) {
          console.log(responseJson.comment[i]);
          switch (responseJson.comment[i]) {
            case 'email already exists':
              setResult('This email is already linked to an account');
              newFColor = { ...newFColor, email: 'red' };
              newNewUser = { ...newNewUser, email: '' };
              break;
            case 'firstName invalid':
              newFColor = { ...newFColor, firstName: 'red' };
              newNewUser = { ...newNewUser, firstName: '' };
              break;
            case 'lastName invalid':
              newFColor = { ...newFColor, lastName: 'red' };
              newNewUser = { ...newNewUser, lastName: '' };
              break;
            case 'email invalid':
              newFColor = { ...newFColor, email: 'red' };
              newNewUser = { ...newNewUser, email: '' };
              break;
            case 'password invalid':
              newFColor = { ...newFColor, password: 'red' };
              newNewUser = { ...newNewUser, password: '' };
              break;
          }
        }
        setFColor(newFColor);
        setNewUser(newNewUser);
      } else {
        setUser({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        });

        navigator.navigate('Welcome New User');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [fColor, newUser]);

  return (
    <View style={styles.container}>
        <Ionicons style={styles.logo} name="person-add"/>
        <Text style={[styles.text, {fontSize: 35}]}>8<Text style={{color:'#525A4F'}}>P</Text>ool</Text>
      <Text style={[styles.text, {marginBottom:15}]}>Create account</Text>
      <TextInput
        style={[styles.input, { borderColor: fColor.lastName }]}
        placeholder="Last Name"
        value={newUser.lastName}
        onChangeText={(text) => setNewUser({ ...newUser, lastName: text })}
      />
      <TextInput
        style={[styles.input, { borderColor: fColor.firstName }]}
        placeholder="First Name"
        value={newUser.firstName}
        onChangeText={(text) => setNewUser({ ...newUser, firstName: text })}
      />
      <TextInput
        style={[styles.input, { borderColor: fColor.email }]}
        placeholder="Email"
        value={newUser.email}
        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
      />
      <TextInput
        style={[styles.input, { borderColor: fColor.password }]}
        placeholder="Password"
        value={newUser.password}
        onChangeText={(text) => setNewUser({ ...newUser, password: text })}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleButton}>
        <Text style={styles.loginText}>Confirm</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Already have an account? </Text>
        <TouchableHighlight onPress={() => navigator.navigate('Login')}>
          <Text style={{ textDecorationLine: 'underline', color: 'white' }}>Login</Text>
        </TouchableHighlight>
      </View>
      <Text style={styles.errorText}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    logo: {
        fontSize: 80,
        color: '#333',
        textAlign:'center'
    },
  container: {
    flex: 1,
    backgroundColor: '#6EB95B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: '#525A4F',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default CreateUserScreen;
