import { StyleSheet, Text, View } from "react-native";
import React from "react";
import info from "../../info";

const Decription = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{info.title}</Text>
      <Text style={styles.normalText}>{info.description}</Text>
    </View>
  );
};

export default Decription;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "#424242",
    borderRadius: 20,
    padding: 20,
    position: "relative",
  },
  headerText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 23,
    color: "#fff",
    marginVertical: 10,
  },
  normalText: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  },
});
