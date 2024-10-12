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
import Icon from "react-native-vector-icons/Entypo";

export default function NewTask() {
  interface Task {
    title: string;
    description: string;
    date: string
    status: boolean
  }
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    date: "",
    status: false
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks: Task[] = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new task
        setTasks([...tasks, task]);
      }
      setTask({ title: "", description: "", date: "", status: false });
    }
  };

  const handleEditTask = (index: number) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ title, description, date }: Task,index:number) => (
    <View style={styles.task}>
      <View style={styles.taskItems}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Text style={styles.itemList}>{title}</Text>
      <Text style={styles.itemList}>{description}</Text>
      <Text style={styles.itemList}>{date}</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Icon name="edit" size={25} color="cyan" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Icon name="trash" size={25} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="gray"
        value={task?.title}
        onChangeText={(text) =>
          setTask({
            title: text,
            description: task.description,
            date: task.date,
            status: task.status
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        multiline
        numberOfLines={3}
        maxLength={40}
        placeholderTextColor="gray"
        value={task?.description}
        onChangeText={(text) =>
          setTask({
            title: task.title,
            description: text,
            date: task.date,
            status: task.status
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        placeholderTextColor="gray"
        value={task?.date}
        onChangeText={(text) =>
          setTask({
            title: task.title,
            description: task.description,
            date: text,
            status: task.status
          })
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Icon name="add-to-list" size={30} color="white" />
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={({ item,index }) => renderItem(item,index)}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
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
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderColor:'#ccc',
    borderWidth:1,
    paddingTop:2,
    paddingBottom:2,
    paddingStart:5,
    paddingEnd:5,
    borderRadius:10,
  },
  itemList: {
    fontSize: 18,
    color: "#ccc",
  },
  taskItems: {
    flexDirection:'column'
  },
  taskButtons: {
    flexDirection: "row",
    gap: 6,
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
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
  buttonOpen: {
    backgroundColor: '#F194FF',
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
