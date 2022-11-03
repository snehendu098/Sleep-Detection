import { StyleSheet, Image, Text } from "react-native";
import React from "react";

const Intro = () => {
  return (
    <>
      <Text
        style={{
          fontSize: 29,
          color: "#474747",
          fontFamily: "Poppins_600SemiBold",
          textAlignVertical: "bottom",
        }}
      >
        Hello User
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "#929292",
          fontFamily: "Poppins_600SemiBold",
          textAlignVertical: "top",
        }}
      >
        Welcome Back
      </Text>
    </>
  );
};

export default Intro;

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    position: "absolute",
    top: 30,
    right: 30,
  },
});
