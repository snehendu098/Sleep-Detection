import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Create = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <AntDesign name="plus" size={40} color="#FDEADF" />
    </TouchableOpacity>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#926420",
    padding: 10,
    borderRadius: 100,
    elevation: 5,
  },
});
