import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableHighlight, Image, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userContext } from '../Data/Data';

const LoginScreen = () => {
  const navigator = useNavigation()
  const [error , setError] = useState("")
  const [user, setUser] = useContext(userContext)
  const [loadingStat, setLoadingStat] = useState(false)
  const [loginUser, setLoginUser] = useState({
    email:'',
    password:''
  })    
  const [fColor, setFColor] = useState({
    email:'white',
    password:'white'
  })

  const connexionButton = async () => {
    setLoadingStat(true)
    try {
      const response = await fetch(
          `https://romain-sigfox-sparkin-project.online/Firm_Break/user/verifConnexion?password=${loginUser.password}&email=${loginUser.email}`,
          {
              method: 'GET',
          }
      )
      setLoadingStat(false)
      let newFColor={
        email:'white',
        password:'white'
      }
      let newUser={...loginUser}
      const responseJson = await response.json();
      console.log(responseJson);      
      if (responseJson.success == false){
        if(responseJson.comment == "email don't exist"){
          setError("This email is not linked to any account")
          newUser.email = ''
          newFColor.email ='red'
        }
        else {
          setError("Incorrect password")
          newUser.password = ''
          newFColor.password='red'
        }
        setLoginUser(newUser)
        setFColor(newFColor)
      }

      else {
        
        setUser({
          firstName : responseJson.firstName,
          lastName : responseJson.lastName,
          profilePicture : responseJson.profilePicture,
          email : loginUser.email
        })
        navigator.navigate("Drawer")
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  
  useEffect(() => {
  }, [loginUser, fColor]);

  return (
    <View style={styles.container}>
      <Ionicons style={styles.logo} name="person-circle-outline"></Ionicons>
      <Text style={[styles.text, {fontSize: 35}]}>8<Text style={{color:'#525A4F'}}>P</Text>ool</Text>
      <Text style={[styles.text, {marginBottom:15, fontSize:20}]}>Account login</Text>
        <View style={[styles.inputContainer, { borderColor: fColor.email }]}>
            <Ionicons name="mail-outline" size={24} color="#333" style={styles.icon}/>
            <TextInput
            value = {loginUser.email}
            onChangeText={text => setLoginUser({...loginUser, email : text})}
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#333"/>
        </View>

        <View style={[styles.inputContainer, { borderColor: fColor.password }]}>
            <Ionicons name="key-outline" size={24} color="#333" />
            <TextInput
            value = {loginUser.password}
            onChangeText={text => setLoginUser({...loginUser, password : text})}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#333"
            secureTextEntry
            />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={connexionButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={{flexDirection:'row'}}>
        <Text style={{color:"white"}}>Don't have an account ? </Text> 
        <TouchableHighlight onPress={()=> navigator.navigate('CreateUser')}><Text style={{textDecorationLine: 'underline', color:'white'}}>Sign-up</Text></TouchableHighlight>
      </View>
      <Text style={{color:'red', marginTop:10}}>{error}</Text>
      <Modal transparent={true} visible={loadingStat}>
          <View style={styles.loading} visible={false}>
            <Image source={require('../assets/loading2.gif')} style={{marginTop:0}}></Image>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { 
    color:'white',
    fontWeight:'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#6EB95B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth:1,
  },
  logo: {
    fontSize: 120,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: '60%',
    height: 40,
    backgroundColor: '#525A4F', 
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  loading:{
      position:'absolute',
      alignSelf:'center',
      bottom:150

  },
});

export default LoginScreen;

