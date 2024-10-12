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

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>
    
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

});
