import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from "react-native";


const LocationSelectionScreen = () => {
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  useEffect(() => {
    fetchSuggestions();
  }, [pincode]);

  const fetchSuggestions = async () => {
    console.log(pincode, 'pin');
    try {
      const response = await fetch(`http://localhost:3001/api/locations/${pincode}`);
      console.log('Response Status:', response.status);
  
      if (!response.ok) {
        // Handle non-successful response (e.g., show an error message)
        console.error('Non-successful response:', response.status);
        return;
      }
  
      const data = await response.json();
      console.log('Suggestions data:', data);
  
      setLocationData(data);
      setSuggestionsVisible(true);
    } catch (error) {
      console.error('Error while fetching location suggestions:', error);
    }
  };
  const handleSelectLocation = (selectedLocation) => {
    setPincode(selectedLocation);
    setSuggestionsVisible(true);
  };

  const detectLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(`Latitude: ${locationData.coords.latitude}, Longitude: ${locationData.coords.longitude}`);
    } catch (error) {
      console.error("Error while detecting location:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={(text) => {
          setPincode(text);
          setSuggestionsVisible(true);
        }}
      />
      <Text style={styles.title}>or</Text>
      <TouchableOpacity style={styles.detectButton} onPress={detectLocation}>
        <Text style={styles.buttonText1}>Detect My Location</Text>
      </TouchableOpacity>
      {suggestionsVisible && (
        <FlatList
          data={locationData}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectLocation(item.formatted_address)}>
              <Text>{item.formatted_address}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.continueButton} onPress={() => handleSelectLocation(pincode)}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color:"white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white"
  },
  title: {
    color:"black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    color:"black",
    borderColor: "grey",
    borderRadius:"15px",
    borderWidth: 0.5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  detectButton: {
    backgroundColor: "#e3e4e5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: "#0071dc",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText1: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default LocationSelectionScreen;
