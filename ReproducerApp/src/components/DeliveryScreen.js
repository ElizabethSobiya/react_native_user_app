import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Video from "react-native-video";

const DeliveryScreen = ({ navigation }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({
    shouldPlay: true,
  });

  const handlePlaybackStatusUpdate = (newStatus) => {
    setStatus({ ...newStatus });

    if (newStatus.isLoaded && newStatus.didJustFinish) {
      // Video finished playing, navigate to the next screen
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/welcome_page.mp4")}
        ref={video}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={false}
        paused={!status.shouldPlay}
        onEnd={handlePlaybackStatusUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default DeliveryScreen;
