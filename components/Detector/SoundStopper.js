import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const SoundStopper = ({ setSoundPlay }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: Dimensions.get("window").width,
        alignItems: "center",
        backgroundColor: "#c49543",
        right: 0,
        left: 0,
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
        Press the Button to stop the sound
      </Text>
      <TouchableOpacity
        onPress={() => {
          setSoundPlay(false);
        }}
      >
        <Text
          style={{
            backgroundColor: "#1c4c9e",
            padding: 10,
            paddingHorizontal: "10%",
            marginTop: 10,
            borderRadius: 5,
            fontFamily: "Poppins_600SemiBold",
            color: "#fff",
          }}
        >
          Stop Sound
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SoundStopper;

const styles = StyleSheet.create({});
