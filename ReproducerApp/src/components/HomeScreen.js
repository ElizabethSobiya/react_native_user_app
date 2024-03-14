import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { Icon, Input } from "react-native-elements";
// import Cat from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import productsData from "../data/products.json";
import { SuperGridSectionList } from "react-native-super-grid";
// import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [userStartedTyping, setUserStartedTyping] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const categoriesData = [
    {
      id: 0,
      name: "Fruits ",
      color: "#00008B",
      image: require("../assets/fruits&veg.webp"),
    },
    {
      id: 1,
      name: "Grocery",
      color: "#00008B",
      image: require("../assets/grocery.webp"),
    },
    {
      id: 2,
      name: "Packaged Foods",
      color: "#00008B",
      image: require("../assets/packaged.webp"),
    },
    {
      id: 3,
      name: "Beverage",
      color: "#00008B",
      image: require("../assets/beverage.jpeg"),
    },
    {
      id: 4,
      name: "Baby & Kids foods",
      color: "#00008B",
      image: require("../assets/babyfoods.webp"),
    },
    {
      id: 5,
      name: "Home & Kitchen",
      color: "#00008B",
      image: require("../assets/tissue.jpeg"),
    },
    {
      id: 6,
      name: "Home Appliances",
      color: "#00008B",
      image: require("../assets/h&mappliances.jpeg"),
    },
    {
      id: 7,
      name: "Mobile & Accesscories",
      color: "#00008B",
      image: require("../assets/mob&acc.jpeg"),
    },
    {
      id: 8,
      name: "Laptop & Accesscories",
      color: "#00008B",
      image: require("../assets/laptop & accessories .jpeg"),
    },
    {
      id: 9,
      name: "Footwear",
      color: "#00008B",
      image: require("../assets/footwear.jpeg"),
    },
    {
      id: 10,
      name: "Personal Care",
      color: "#00008B",
      image: require("../assets/personalcare.png"),
    },
    {
      id: 11,
      name: "Jewellery",
      color: "#00008B",
      image: require("../assets/jewels.webp"),
    },
  ];

  const [carouselData] = useState([
    require("../assets/banner.jpeg"),
    require("../assets/banner.jpeg"),
    require("../assets/banner.jpeg"),
  ]);
  const openLocationModal = () => {
    setLocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setLocationModalVisible(false);
  };

  const detectCurrentLocation = async () => {
    try {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(
            `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
          );
        },
        (error) => {
          console.error("Error while detecting location:", error);
        }
      );
    } catch (error) {
      console.error("Error while detecting location:", error);
    }
  };
  
  const updateSearch = (text) => {
    setSearch(text);
  };
  const handleSaveLocation = () => {
    const newSavedLocations = [
      ...savedLocations,
      locationInput || currentLocation,
    ];
    setSavedLocations(newSavedLocations);
    setLocationInput("");
  };
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <TouchableOpacity style={styles.categoryItemContainer}>
        <Image
          source={item.image}
          style={styles.categoryItemImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={styles.categoryItemTitle}>{item.name}</Text>
    </View>
  );
  const renderProductListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.productListImage} />
      <View style={styles.productListTextContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productQuantity}>{`Quantity: ${
          item.weight || 1
        }`}</Text>
        <View style={styles.priceAndButtonContainer}>
          <View style={styles.productPriceContainer}>
            <Text style={styles.originalPrice}>{`₹${item.price}`}</Text>
            {item.discountPrice && (
              <Text style={styles.discountPrice}>{`₹${
                item.discountPrice || item.price
              }`}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderCarouselItem = ({ item }) => (
    <Image source={item} style={styles.bannerImage} resizeMode="cover" />
  );
  const openSidebar = () => {
    // navigation.dispatch(DrawerActions.openDrawer());
  };
  const handleSelectLocation = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    setSearchInput(selectedLocation); // Set the search input to the selected location
    setLocationModalVisible(false); // Close the location modal
    // Additional logic if needed
  };

  const fetchLocationSuggestions = async (query) => {
    // try {
    //   const response = await fetch(
    //     `http://localhost:8080/api/locations/${query}`
    //   );
    //   const data = await response.json();
    //   setLocationSuggestions(data);
    // } catch (error) {
    //   console.error("Error while fetching location suggestions:", error);
    // }
  };
  const handleSearchInputChange = (text) => {
    setSearchInput(text);
    // Fetch suggestions when the search input changes
    // fetchLocationSuggestions(text);
    setUserStartedTyping(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon
            name="search"
            type="material"
            size={25}
            color="#00008B"
            style={styles.searchIconHome}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for items"
          />
        </View>
      </View>

      <FlatList
        data={categoriesData}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={styles.categoriesContainer}
      />
      <Carousel
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={400}
        itemWidth={400}
        loop
        autoplay
        autoplayInterval={3000}
      />

      <Text style={styles.bannerHeading}>
        Find Everything In <Text style={{ color: "#00008B" }}>One Go</Text>
      </Text>

      <SuperGridSectionList
        itemDimension={100}
        sections={[
          {
            title: "Products",
            data: productsData,
          },
        ]}
        renderItem={renderProductListItem}
        keyExtractor={(item) => item.name}
      />
      {/* Location Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isLocationModalVisible}
        onRequestClose={closeLocationModal}
        style={styles.locationModal}
      >
        <View style={styles.locationModalContainer}>
          {/* Back Arrow */}
          <TouchableOpacity
            onPress={closeLocationModal}
            style={styles.backButton}
          >
            <Icon
              name="arrow-back"
              type="material"
              size={30}
              color="#00008B"
              style={styles.backArrow}
            />
            <Text style={styles.text}>Your Location</Text>
          </TouchableOpacity>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            {/* Input Bar */}
            <View style={styles.searchBarContainer}>
              <View style={styles.searchInputWrapper}>
                <Icon
                  name="search"
                  type="material"
                  size={25}
                  color="#00008B"
                  style={styles.searchIconHome}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for area names"
                  value={searchInput}
                  onChangeText={handleSearchInputChange}
                />
                {userStartedTyping && locationSuggestions.length === 0 && (
                  <Text style={styles.noDeliveryText}>
                    {/* No delivery locations available */}
                  </Text>
                )}
              </View>
            </View>
            {locationSuggestions.length > 0 ? (
            <FlatList
              data={locationSuggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <View style={styles.suggestionContainer}>
                  {item.postcode_localities.map((locality, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectLocation(locality)}
                    >
                      <Text style={styles.suggestionText}>
                        {locality}, {item.formatted_address}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <View style={styles.line} />
                </View>
              )}
            />
          ) : (
            <Text style={styles.noDeliveryText}>
              {/* No delivery locations available */}
            </Text>
          )}

            {/* Detect Current Location */}
            <TouchableOpacity
              style={styles.detectButton}
              onPress={detectCurrentLocation}
            >
              <Icon
                name="gps-fixed"
                type="material"
                size={20}
                color="#00008B"
              />
              <View style={styles.currentLocationTextContainer} >
                <Text style={styles.currentLocationText}>Current Location</Text>
                <Text style={styles.usingGPSText}>Using GPS</Text>
              </View>
            </TouchableOpacity>
            {/* Saved Locations */}
            <View style={styles.savedLocationsContainer}>
              {savedLocations.length > 0 ? (
                savedLocations.map((savedLocation, index) => (
                  <Text key={index} style={styles.savedLocationText}>
                    {savedLocation}
                  </Text>
                ))
              ) : (
                <Text style={styles.saveText}>No Saved Locations</Text>
              )}
              {/* Save Location Button */}
              {/* <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
                <Icon name="save" type="material" size={24} color="white" />
                <Text style={styles.buttonText}>Save Location</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomIcons}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="home" type="material" size={30} color="#00008B" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("CategoryScreen")}
        >
          <Icon name="grid" type="material" size={30} color="#00008B" />
          <Text style={styles.iconText}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Icon
            name="notifications"
            type="material"
            size={30}
            color="#00008B"
          />
          <Text style={styles.iconText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon
            name="shopping-cart"
            type="material"
            size={30}
            color="#00008B"
          />
          <Text style={styles.iconText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // fontFamily: "Roboto",
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 5,
    marginTop: 10,
    paddingLeft: 10,
  },
  headerBg: {
    height: 80,
    margin: 0,
    marginLeft: 0,
    paddingLeft: 0,
    width: 429,
  },
  locationSection: {
    flexDirection: "row",
    marginRight: 150,
    color: "tomato",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 10,
    fontSize: 20,
  },
  locationModalContainer: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    margin: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: "60px",
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
  inputWrapper: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FFFF",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
  },

  input: {
    height: 40,
    flex: 1,
  },

  searchIcon: {
    marginLeft: 10, // Adjust the marginLeft to position the icon
    color: "#00008B",
  },
  detectButton: {
    flexDirection: "row",
    width: 410,
    marginLeft: 12,
    marginRight: 5,
    alignItems: "center",
    color: "#00008B",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  currentLocationTextContainer: {
    marginLeft: 10,
    color: "#00008B",
  },
  currentLocationText: {
    fontSize: 17,
    // fontWeight: '600',
    color: "#00008B",
  },
  usingGPSText: {
    fontSize: 10,
    color: "#00008B",
  },
  savedLocationsContainer: {
    marginBottom: 10,
  },
  savedLocationText: {
    marginBottom: 5,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#00008B",
    width: 410,
    marginLeft: 10,
    marginRight: 5,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    paddingLeft: "20px",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    // fontWeight: 600,
    color: "white",
  },
  saveText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: "20px",
    alignItems: "center",
    fontSize: 18,
    // fontWeight: "600",
  },
  searchIcon: {
    position: "absolute",
    color: "#00008B",
    backgroundColor: "red",
    top: 0,
    left: 0,
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    color: "#00008B",
  },
  searchBarContainer: {
    // marginTop: 10,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 5,
  },
  searchInput: {
    height: 40,
    flex: 1,
    paddingLeft: 3,
  },
  searchIconHome: {
    paddingLeft: 1,
    color: "#00008B",
  },
  searchInputLocation: {
    height: 40,
    flex: 1,
    paddingLeft: 3,
  },
  searchInputWrapperLoc: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FFFF",
    borderRadius: 8,
    borderColor: "#F0FFFF",
    borderWidth: 0.5,
    paddingLeft: 5,
  },
  bannerHeading: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: 10,
  },
  bannerImage: {
    height: 205,
    width: "93%",
    marginVertical: 20,
    // marginHorizontal:10,
    marginLeft: 10,
    // marginRight:10,
    borderRadius: 3,
  },
  gridItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 3,
    padding: 0,
    marginBottom: 20,
    lineHeight: 20,
    // borderWidth: 1,
    // borderRadius: 8,
    // borderColor: '#ccc',
    backgroundColor: "#fff",
  },
  productListImage: {
    width: 95,
    height: 80,
    borderRadius: 3,
  },
  productQuantity: {
    fontSize: 10,
    color: "black",
  },
  productListTextContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  productName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceAndButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 9,
    color: "#888888",
    marginBottom: 4,
  },
  productPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 10,
    color: "grey",
    marginRight: 8,
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 10,
    color: "black",
  },
  addToCartButton: {
    // backgroundColor: "#00008B",
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginLeft: 5,
    borderRadius: 5,
    borderColor: "#00008B",
    borderWidth: 1,
    marginLeft: 5,
  },
  addToCartButtonText: {
    fontSize: 9,
    // fontWeight: 600,
    color: "#00008B",
  },
  categoriesContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  categoryItem: {
    marginBottom: 100,
  },
  categoryItemContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    // borderColor: "black",
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 110,
    marginTop: 20,
  },
  categoryItemImage: {
    width: "100%",
    height: "150%",
  },
  categoryItemTitle: {
    position: "absolute",
    bottom: -101,
    zIndex: 1, // Adjust the spacing as needed
    textAlign: "center",
    width: "100%",
    fontSize: 11,
    // fontWeight: 600,
    paddingTop: 5,
  },
  suggestionContainer: {
    margin: 10,
  },
  formattedAddressText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  suggestionText: {
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ccc",
    padding: 5,
    // margin: 5,
  },
});

export default HomeScreen;
