import React, { useContext, useEffect, useState } from "react";
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { userContext } from "../Data/Data";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [modalState, setModalState] = useState(true)
  const [data, setData] = useState();
  const [user] = useContext(userContext);
  const navigator = useNavigation()
  const fetchData = async () => {
    const response = await fetch(`https://romain-sigfox-sparkin-project.online/Firm_Break/break/getBreak?email=${user.email}`);
    const data = await response.json();
    setData(data);
  };
  const handleButton = () =>{
    setModalState(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.view}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <BreakItem
            id={index + 1}
            date={item.date}
            place={item.place}
            opponent={item.opponent}
            description={item.description}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Ionicons style={styles.buttonPlus} name="add-circle-outline" onPress={() => navigator.navigate('Break')} />
      <Modal transparent={true} visible={modalState}>
        <View style={{backgroundColor:"#000000aa", flex:1, justifyContent:'center'}}>
          <View style={{backgroundColor:"#ffffff", margin:50, padding:40, borderRadius:10, alignItems:'center'}}> 
            <Text style={{fontSize:25}}>Welcome {user.firstName} !</Text>
            <TouchableOpacity style={styles.button} onPress={handleButton}>
              <Text style={styles.buttonText}>Get in !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const BreakItem = ({ id, date, place, opponent, description }) => {
  return (
    <TouchableOpacity style={styles.breakItem}>
      <Text style={styles.breakItemText}>n° {id}</Text>
      <Text style={styles.breakItemText}>Date: {date}</Text>
      <Text style={styles.breakItemText}>Place: {place}</Text>
      <Text style={styles.breakItemText}>Opponent: {opponent}</Text>
      <Text style={styles.breakItemText}>Description: {description}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  view: {
    flex: 1,
    padding: 10,
    backgroundColor: "#6EB95B",
  },
  listView: {
    marginVertical: 10,
  },
  buttonPlus: {
    fontSize: 70,
    color:"#525A4F",
    position:'absolute',
    right:10,
    bottom:10,
  },
  breakItem: {
    backgroundColor: "#6EB95B",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor:"white",
    borderWidth: 1,
  },
  breakItemText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#525A4F',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
};

export default HomeScreen;
