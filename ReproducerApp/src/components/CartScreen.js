import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const CartScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;

  const handleBackPress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const calculateTotalPrice = (item) => {
    // Check if there is a discount price
    const price = item.discountPrice ? item.discountPrice : item.price;
    return price * item.quantity;
  };

  const calculateTotalCartPrice = () => {
    let totalCartPrice = 0;
    cartItems.forEach((item) => {
      totalCartPrice += calculateTotalPrice(item);
    });
    return totalCartPrice;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-back" type="material" size={30} color="#00008B" />
      </TouchableOpacity>
      <Text style={styles.title}>Cart Items:</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.totalPrice}>Total Price: ₹{calculateTotalPrice(item)}</Text>
          </View>
        )}
      />
      <Text style={styles.totalCartPrice}>Total Cart Price: ₹{calculateTotalCartPrice()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50,
  },
  cartItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    color: "#888",
  },
  totalPrice: {
    color: "#000",
    fontWeight: "bold",
  },
  totalCartPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default CartScreen;
