import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { DataTask } from "@/types";
import { useSQLiteContext } from "expo-sqlite";

export default function HomeScreen() {
  const [open, setOpen] = useState<boolean>(false)
  const [tasks, SetTasks] = useState<DataTask[]>([]); 
  //grab data from sqlite
  const db = useSQLiteContext();

  useEffect(() =>{
    db.withTransactionAsync(async () =>{
      await getTask()
    })
  },[db])
  
  async function getTask() {
    const result = await db.getAllAsync<DataTask>(`SELECT * FROM Task ORDER BY date`)
    SetTasks(result)
  }

  const RenderList = ({ id, title, description, date, status }: DataTask) => (
    <TouchableOpacity onPress={() => setOpen(true)}>
      <View style={styles.listtask} key={id}>
        <View style={styles.headertask}>
          <Text style={styles.titletask}>{title}</Text>
          <Octicons
            name="check-circle"
            size={20}
            color={status == "true" ? "green" : "white"}
          />
        </View>
        <Text style={styles.descriptiontask}>{date}</Text>
        <Text style={styles.descriptiontask}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>
      <FlatList
       data={tasks}
        renderItem={({ item }) => (
          <RenderList
            id={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            status={item.status}
          />
        )}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setOpen(!open)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ccc",
    marginBottom: 40,
    textAlign: "center",
  },
  listtask: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginBottom: 8,
  },
  headertask: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  titletask: {
    color: "#ccc",
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptiontask: {
    color: "#ccc",
    fontSize: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
