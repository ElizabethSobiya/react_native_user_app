// Sidebar.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";



const Sidebar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={styles.sidebarContainer}>
      <TouchableOpacity onPress={() => navigateToScreen("Orders")}>
        <Text>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("Address")}>
        <Text>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("CustomerSupport")}>
        <Text>Customer Support</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("Profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("Refunds")}>
        <Text>Refunds</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("Notifications")}>
        <Text>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("GeneralInfo")}>
        <Text>General Info</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen("Preferences")}>
        <Text>Preferences</Text>
      </TouchableOpacity>
      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default Sidebar;
