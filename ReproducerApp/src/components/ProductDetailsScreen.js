import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import productsData from "../data/products.json";

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [isProductInfoOpen, setIsProductInfoOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = () => {
      const selectedProduct = productsData.find(
        (item) => item.id === productId
      );
      setProduct(selectedProduct);
    };

    fetchProductDetails();
  }, [productId]);

  const handleBackPress = () => {
    navigation.navigate("HomeScreen");
  };

  const handleProductInfoToggle = () => {
    setIsProductInfoOpen(!isProductInfoOpen);
  };
  const handleAddToCart = () => {
    // Check if the product is already in the cart
    console.log(`Product ID: ${product.id}, Quantity: ${quantity}`);
    setCartItems((prevCartItems) => {
  const existingItem = prevCartItems.find((item) => item.id === product.id);

  if (existingItem) {
    return prevCartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...prevCartItems, { ...product, quantity: 1 }];
  }
});
  };
  const handleSubtractFromCart = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart.filter((item) => item.quantity > 0));
  };
  const handleViewCart = () => {
    navigation.navigate("Cart", { cartItems });
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" type="material" size={30} color="#00008B" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="search"
            type="material"
            size={30}
            color="#00008B"
            style={styles.search}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: product.image }}
        style={[styles.fullWidthImage, { resizeMode: "cover", flex: 1 }]}
      />

      {/* Product Details */}
      <View style={styles.products}>
        <Text style={styles.brandName}>Brand Name</Text>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productQuantity}>{`${product.weight || 1}`}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{`₹${product.price}`}</Text>
          {product.discountPrice && (
            <>
              <Text
                style={styles.discountPrice}
              >{` ₹${product.discountPrice}`}</Text>
              <TouchableOpacity style={styles.offer}>
                <Text style={styles.offerText}> 20% off</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addSubtractButton} onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          <Icon name="remove" type="material" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addSubtractButton} onPress={() => setQuantity(quantity + 1)}>
          <Icon name="add" type="material" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      </View>
      <Text style={styles.highlightsHeading}>Product Highlights</Text>
      {/* Product Highlights */}
      <View style={styles.highlightsContainer}>
        {/* Container 1 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.highlightCategoryContainer}>
            <View style={styles.highlightItemContainer}>
              <Text style={styles.highlightItem}>Culinary use</Text>
              <Text style={styles.highlightItemDescription}>Daily needs</Text>
            </View>
            {/* Add other items for Container 1 as needed */}
          </View>
          {/* Container 2 */}
          <View style={styles.highlightCategoryContainer}>
            <View style={styles.highlightItemContainer}>
              <Text style={styles.highlightItem}>Storage instruction</Text>
              <Text style={styles.highlightItemDescription}>
                Room temperature
              </Text>
            </View>
            {/* Add other items for Container 2 as needed */}
          </View>
          {/* Container 3 */}
          <View style={styles.highlightCategoryContainer}>
            <View style={styles.highlightItemContainer}>
              <Text style={styles.highlightItem}>Health benefits</Text>
              <Text style={styles.highlightItemDescription}>
                Antioxidant rich
              </Text>
            </View>
            {/* Add other items for Container 3 as needed */}
          </View>
          {/* Container 4 */}
          <View style={styles.highlightCategoryContainer}>
            <View style={styles.highlightItemContainer}>
              <Text style={styles.highlightItem}>Sourced from</Text>
              <Text style={styles.highlightItemDescription}>Nashik</Text>
            </View>
            {/* Add other items for Container 4 as needed */}
          </View>
        </ScrollView>
      </View>

      {/* Product Description */}
      <TouchableOpacity
        style={styles.descriptionContainer}
        onPress={handleProductInfoToggle}
      >
        <View style={styles.descriptionHeadingContainer}>
          <Text style={styles.descriptionHeading}>Product Description</Text>
          {/* Open arrow icon */}
          <Icon
            name={
              isProductInfoOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            type="material"
            size={30}
            color="#00008B"
          />
        </View>
        {/* Your product description content goes here */}
        {isProductInfoOpen && (
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.stickyViewCartButton}>
        <TouchableOpacity style={styles.staticButton} onPress={handleViewCart}>
          <Icon name="shopping-bag" type="material" size={25} color="white" />
          <Text style={styles.staticButtonText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    boxShadow: "10px 10px 2px -2px rgba(0, 0, 0, 0.2)",
  },
  search: {
    marginRight: 10,
  },
  fullWidthImage: {
    // marginLeft:10,
    // marginRight:10,
    width: "100%",
    height: 200,
  },
  products: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft:10
  },
  productName: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 16,
  },
  brandName: {
    paddingBottom: 5,
    fontSize: 16,
    color:"grey"
  },
  productQuantity: {
    color: "grey",
  },
  detailsContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#89CFF0",
    borderBottomWidth: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 18,
    color: "#000",
    marginLeft: 5,
  },
  offer: {
    backgroundColor: "#00008B",
    padding: 8,
    marginLeft: 10,
    fontSize: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  offerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#00008B",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  highlightsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  highlightCategoryContainer: {
    backgroundColor: "#f8f8f8",
    margin: 5,
    padding: 5,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
    width: 150,
    marginBottom: 15,
  },
  highlightItemContainer: {
    marginRight: 5,
    marginTop: 5,
    marginLeft: 5,
    // width: 120, // Adjust the width as needed
  },
  highlightsContainer: {
    padding: 5,
    borderBottomColor: "#89CFF0",
    borderBottomWidth: 10,
  },
  highlightItemDescription: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: 5,
  },
  highlightItem: {
    fontSize: 10,
    color: "#888",
  },
  descriptionContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  descriptionHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  descriptionHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 16,
  },
  stickyViewCartButton: {
    position: "sticky",
    backgroundColor: "#00008B",
    margin: 20,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  staticButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  staticButtonText: {
    fontSize: 16,
    marginRight: 5,
    paddingLeft: 5,
    color: "#fff",
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
});

export default ProductDetailsScreen;
