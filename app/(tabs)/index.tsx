import React, { useState } from "react";
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

export default function HomeScreen() {
  interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    status: boolean;
  }
  const [open, setOpen] = useState<boolean>(false)
  const [tasks, SetTasks] = useState<Task[]>([
    {
      id: 1, //sample data
      title: "Grocery",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "28/10/24",
      status: false,
    },
    {
      id: 2,
      title: "Piano Class",
      description:
        "Praesent non velit tincidunt, ullamcorper nisi nec, hendrerit nulla.",
      date: "20/11/24",
      status: false,
    },
    {
      id: 3,
      title: "Recipe Blog",
      description: "Donec maximus sed felis eu imperdiet.",
      date: "20/10/24",
      status: true,
    },
  ]);
  const handleStatus = (id:number) =>{

  }
  const sortList = (a:Task,b:Task) =>{
    var dateA = new Date(a.date)
    var dateB = new Date(b.date)
    console.log(dateA)
    console.log(dateB)
    return dateA > dateB ? 1 : -1
  }
  const RenderList = ({ id, title, description, date, status }: Task) => (
    <TouchableOpacity onPress={() => setOpen(true)}>
      <View style={styles.listtask} key={id}>
        <View style={styles.headertask}>
          <Text style={styles.titletask}>{title}</Text>
          <Octicons
            name="check-circle"
            size={20}
            color={status ? "green" : "white"}
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
       // data={tasks.sort((a,b)=> a.date.localeCompare(b.date))}
       data={tasks.sort(sortList)}
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
        animationType="fade"
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
