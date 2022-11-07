import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Audio } from "expo-av";

const DetectorScreen = () => {
  const [hasPermission, setHasPermission] = useState();
  const [faceData, setfaceData] = useState([]);
  const [closeTime, setcloseTime] = useState(0);
  const [soundPlay, setSoundPlay] = useState(false);
  const [sound, setSound] = useState(null);

  const handleFacesDetected = ({ faces }) => {
    setfaceData(faces);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const detectData = async () => {
    if (soundPlay) {
      playSound();
    } else if (!soundPlay && sound) {
      await sound.stopAsync();
      setcloseTime(0);
      setSound(null);
      await sound.unloadAsync();
    }
  };

  useEffect(() => {
    detectData();
  }, [soundPlay]);

  setTimeout(async () => {
    if (
      faceData[0] &&
      faceData[0]?.rightEyeOpenProbability < 0.1 &&
      faceData[0]?.leftEyeOpenProbability < 0.1
    ) {
      await setcloseTime(closeTime + 1);
      // console.log(closeTime);
    } else if (
      (closeTime !== 0 &&
        faceData[0]?.rightEyeOpenProbability > 0.1 &&
        faceData[0]?.leftEyeOpenProbability > 0.1) ||
      !faceData[0]
    ) {
      await setcloseTime(0);
    }
  }, 1000);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sound/160k.mp3")
    );

    setSound(sound);
    await sound.playAsync();
  }

  if (closeTime >= 3 && !soundPlay) {
    setSoundPlay(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.conatiner}>
      <Text style={styles.info}>
        Put your phone in the correct place so that we can detect your face
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          backgroundColor: faceData.length <= 0 ? "#E92D2D" : "#4EA847",
          padding: 3,
          textAlign: "center",
          fontSize: 17,
          borderRadius: 70,
          color: "#fff",
          marginTop: 20,
        }}
      >
        {faceData.length <= 0
          ? "NO FACE FOUND"
          : `FACE FOUND: ${faceData.length}`}
      </Text>
      <View style={styles.cameraContainer}>
        {hasPermission ? (
          <View style={styles.cameraSub}>
            <Camera
              type={Camera.Constants.Type.front}
              style={styles.camera}
              onFacesDetected={handleFacesDetected}
              faceDetectorSettings={{
                mode: FaceDetector.FaceDetectorMode.fast,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications:
                  FaceDetector.FaceDetectorClassifications.all,
                minDetectionInterval: 100,
                tracking: true,
              }}
            />
          </View>
        ) : (
          <TouchableOpacity style={{ flex: 1 }}>
            <Text>Permission Not Allowed</Text>
          </TouchableOpacity>
        )}
      </View>
      {sound && (
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
      )}
    </ScrollView>
  );
};

export default DetectorScreen;

const styles = StyleSheet.create({
  conatiner: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  stopSound: {},
  cameraContainer: {
    height: 300,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cameraSub: {
    height: "100%",
    width: "77%",
    borderRadius: 20,
    overflow: "hidden",
  },
  info: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#929292",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
});
