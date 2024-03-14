import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    // Here, you should send an OTP to the provided phone number
    // For simplicity, let's assume the OTP is "123456"
    const sentOtp = '123456';

    Alert.alert('OTP Sent', `An OTP has been sent to ${phoneNumber}.`);
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Here, you should verify the OTP entered by the user
    // For simplicity, let's assume the correct OTP is "123456"
    const correctOtp = '123456';

    if (otp === correctOtp) {
      Alert.alert('Success', 'OTP verification successful!');
      // Add navigation logic to your authenticated area
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login with Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      {isOtpSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "#00008B",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    fontWeight: "bold",
  },
});

export default LoginScreen;
