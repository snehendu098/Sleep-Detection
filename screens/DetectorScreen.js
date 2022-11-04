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

const DetectorScreen = () => {
  const [hasPermission, setHasPermission] = useState();
  const [faceData, setfaceData] = useState();

  const handleFacesDetected = ({ faces }) => {
    setfaceData(faces);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.conatiner}>
      <Text style={styles.info}>
        Put your phone in the correct place so that we can detect your face
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          backgroundColor: "#E92D2D",
          padding: 3,
          textAlign: "center",
          fontSize: 17,
          borderRadius: 70,
          color: "#fff",
          marginTop: 20,
        }}
      >
        NO FACES FOUND
      </Text>
      <View style={styles.cameraContainer}>
        {hasPermission ? (
          <Camera
            type={Camera.Constants.Type.front}
            style={styles.camera}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
          />
        ) : (
          <TouchableOpacity style={{ flex: 1 }}>
            <Text>Permission Not Allowed</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={() => console.log(faceData)}>
        <Text>Click</Text>
      </TouchableOpacity>
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
  soundSelectView: {},
  cameraContainer: {
    height: 300,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  camera: {
    height: "100%",
    width: "77%",
    borderRadius: 20,
  },
  info: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#929292",
  },
});
