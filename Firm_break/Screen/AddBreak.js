import React, { useContext, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { userContext } from '../Data/Data';

const AddBreakScreen = () => {
  const [resultText, setResultText] = useState("");
  const [user] = useContext(userContext);
  const [firmBreak, setFirmBreak] = useState({
    date: '',
    place: '',
    opponent: '',
    description: ''
  });

  const handleButton = async () => {
    console.log(`https://romain-sigfox-sparkin-project.online/Firm_Break/break/addBreak?email=${user.email}&date=${firmBreak.date}&place=${firmBreak.place}&opponent=${firmBreak.opponent}&description=${firmBreak.description}`)
    try {
      const response = await fetch(
        `https://romain-sigfox-sparkin-project.online/Firm_Break/break/addBreak?email=${user.emial}&date=${firmBreak.date}&place=${firmBreak.place}&opponent=${firmBreak.opponent}&description=${firmBreak.description}`,
        {
          method: 'GET',
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      setResultText("Your break has been added to your list");
      setFirmBreak({ date: '', place: '', opponent: '', description: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Break</Text>

      <View style={[styles.inputContainer]}>
            <Ionicons name="calendar-outline" size={28} color="#333" />
            <TextInput
            placeholder="Date"
            value={firmBreak.date}
            onChangeText={text => setFirmBreak({ ...firmBreak, date: text })}
            style={styles.input}
            />
      </View>

      <View style={[styles.inputContainer]}>
            <Ionicons name="location-outline" size={28} color="#333" />
            <TextInput
            placeholder="Place"
            value={firmBreak.place}
            onChangeText={text => setFirmBreak({ ...firmBreak, place: text })}
            style={styles.input}
            />
      </View>

      <View style={[styles.inputContainer]}>
            <Ionicons name="person-outline" size={28} color="#333" />
            <TextInput
            placeholder="Opponent"
            value={firmBreak.opponent}
            onChangeText={text => setFirmBreak({ ...firmBreak, opponent: text })}
            style={styles.input}
            />
      </View>

      <View style={[styles.inputContainer]}>
            <Ionicons name="document-text-outline" size={28} color="#333" />
            <TextInput
            placeholder="Description"
            value={firmBreak.description}
            onChangeText={text => setFirmBreak({ ...firmBreak, description: text })}
            multiline={true} // Permet les sauts de ligne
            style={[styles.input, {height:120}]}
            />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleButton}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {resultText && <Text style={styles.resultText}>{resultText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: "#6EB95B",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth:1,
    borderColor:'white',
    backgroundColor:'white'
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: "#525A4F",
    width: '60%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  resultText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});

export default AddBreakScreen;
