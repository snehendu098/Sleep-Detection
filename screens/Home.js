import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import Intro from "../components/Home/Intro";
import Decription from "../components/Home/Decription";
import Create from "../components/core/Create";

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Intro />
      <Decription />
      <Create />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    position: "relative",
  },
});
