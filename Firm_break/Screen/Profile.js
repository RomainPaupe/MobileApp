import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { userContext } from '../Data/Data';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';



const ProfileScreen = () => {
  const [modalCameraStat, setModalCameraStat] = useState(false)
  const [modalStat, setModalStat] = useState(false)  
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [user, setUser] = useContext(userContext);
  const navigator = useNavigation();

  useEffect(() => {
     if(image){
        setModalCameraStat(true);
      }
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
     
      
    })();
  }, [image]);


  const openCam = () => {
    setImage(null)
    setModalStat(false)
    setModalCameraStat(true)
  }

  const validPicture = () => {
    setModalCameraStat(false)
    setUser({...user, profilePicture : image})
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUser({...user, profilePicture : result.assets[0].uri})
    }
  }

  const toogleImage = () => {
    setModalStat(true)
  }
  const closeButton = () => {
    setModalStat(false)
  }

  const handleButton = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    navigator.navigate('Welcome');
  }

  return (
      <View style={styles.container}>
          
        <View style={{alignItems:'flex-end', marginBottom:20}}>
          <Image style={styles.imageProfile} source={{ uri: user.profilePicture }}/>
          <TouchableOpacity onPress={toogleImage}>
            <Image style={styles.imagePen} source={require('../assets/edit.png')}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <TouchableOpacity onPress={handleButton} style={styles.button}>
          <Text style={styles.buttonText}>Disconnect</Text>
        </TouchableOpacity>


        <Modal transparent={true} visible={modalCameraStat}>
          <View style={styles.cameraModalContainer}>
            <View style={styles.cameraModal}>
              {!image ? (    
              <Camera 
                style={styles.camera} 
                type={type}        
                ref={cameraRef}
                flashMode={flash}>
              </Camera>) : (
                  <Image source={{ uri: image }} style={styles.camera}/>
              )}
              {!image ?(
                <TouchableOpacity style={{justifyContent:'flex-end', alignSelf:'center'}} onPress={takePicture}>
                  <Ionicons name='camera-outline' size={45} color={'white'}/>
                </TouchableOpacity>
                ):(
                  <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>setImage(null)} style={{marginHorizontal:30}}>
                      <Ionicons name='refresh-outline' size={45} color={'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={validPicture} style={{marginHorizontal:30}}>
                      <Ionicons name='checkmark-outline' size={45} color={'white'}/>
                    </TouchableOpacity>
                  </View>
                )
              }

          </View>
          </View>
        </Modal>


        <Modal transparent={true} visible={modalStat}>
          <View style={{flex:1, justifyContent:'flex-end', backgroundColor:'#000000aa'}}>
            <View style={{backgroundColor:"white", alignItems:'center', justifyContent:'flex-end', borderTopEndRadius:20, borderTopStartRadius:20}}>
              <TouchableOpacity onPress={closeButton} style={{marginHorizontal:10}}>
                <View style={styles.line}><Text>                          </Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={openCam} style={styles.buttonPict}>
                <Text style={styles.buttonText}>Take a picture</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage} style={[styles.buttonPict, {marginBottom:15}]}>
                <Text style={styles.buttonText}>Chose from galery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EB95B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  emailText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: '#525A4F',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePen:{
    position:'absolute',
    bottom:1,
    right:3,
    height:25,
    width:25,
  },
  imageProfile:{
    borderRadius:1000,
    height:200,
    width:200,
  },
  buttonPict: {
    width: '80%',
    height: 40,
    backgroundColor: '#525A4F',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  line:{
    width: '80%', // Ajustez la longueur de la ligne selon vos besoins
    height: 6, // Épaisseur de la ligne
    backgroundColor: '#525A4F',
    marginTop:10,
    marginBottom:5,
    borderRadius:30
  },

  cameraModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Arrière-plan semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    
  },
  cameraModal: {
    backgroundColor: 'black', // Couleur de fond de la vue de la caméra
    borderRadius: 20,
    width: '80%',
    height: '90%',
    justifyContent: 'center',
    overflow: 'hidden', // Assurez-vous que le débordement est masqué
  },

  camera: {
    flex: 1,
    width: '100%',
  },

  imageContainer: {
    flex: 1, // Occuper tout l'espace disponible
    justifyContent: 'center', // Centrer l'image verticalement
    alignItems: 'center', // Centrer l'image horizontalement
  },
  
});

export default ProfileScreen;
