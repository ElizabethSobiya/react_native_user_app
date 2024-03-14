import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,  FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const categories  = [
    {
      id: 0,
      name: "Fruits & Vegetables",
      color: "#00008B",
      image: require("../assets/fruits&veg.webp"),
      products: [
        { id: 0, name: "Apple", image: require("../assets/apples.jpeg") },
        { id: 1, name: "Banana" ,image: require("../assets/banana.jpeg")},]
    },
    {
      id: 1,
      name: "Grocery",
      color: "#00008B",
      image: require("../assets/grocery.webp"),
      products: [
        { id: 0, name: "Sugar" ,image: require("../assets/grocery.webp"),},
        { id: 1, name: "Coffee",image: require("../assets/coffee.webp") },]
    },
    {
      id: 2,
      name: "Packaged Foods",
      color: "#00008B",
      image: require("../assets/packaged.webp"),
      products: [
        { id: 0, name: "Lays" , image: require("../assets/lays.webp")   },
        { id: 1, name: "Amul Cheese" ,image: require("../assets/cheesee.jpeg") },]
    },
    {
      id: 3,
      name: "Beverage",
      color: "#00008B",
      image: require("../assets/beverage.jpeg"),
      products: [
        { id: 0, name: "Pepsi" , image: require("../assets/pepsi.jpeg")},
        { id: 1, name: "Coca-cola", image: require("../assets/coca_cola.jpeg") },]
    },
    {
      id: 4,
      name: "Baby & Kids foods",
      color: "#00008B",
      image: require("../assets/babyfoods.webp"),
      products: [
        { id: 0, name: "Cerals" , image: require("../assets/cerals.jpeg") },
        { id: 1, name: "Milk Powder", image: require("../assets/milk_powder.jpeg")  },]
    },
    {
      id: 5,
      name: "Home & Kitchen",
      color: "#00008B",
      image: require("../assets/tissue.jpeg"),
      products: [
        { id: 0, name: "Knife", image: require("../assets/knife.jpeg")  },
        { id: 1, name: "Cutting board", image: require("../assets/cutting_board.webp") },]
    },
    {
      id: 6,
      name: "Home Appliances",
      color: "#00008B",
      image: require("../assets/h&mappliances.jpeg"),
      products: [
        { id: 0, name: "Tv", image: require("../assets/tv.jpeg") },
        { id: 1, name: "Fridge", image: require("../assets/fridge.webp") },]
    },
    {
      id: 7,
      name: "Mobile & Accesscories",
      color: "#00008B",
      image: require("../assets/mob&acc.jpeg"),
      products: [
        { id: 0, name: "Screen cover", image: require("../assets/temper.jpeg") },
        { id: 1, name: "Mobile case" , image: require("../assets/mobile_case.jpeg")},]
    },
    {
      id: 8,
      name: "Laptop & Accesscories",
      color: "#00008B",
      image: require("../assets/laptop & accessories .jpeg"),
      products: [
        { id: 0, name: "Mouse", image: require("../assets/mouse.webp") },
        { id: 1, name: "Keyboard", image: require("../assets/keyboard.jpeg") },]
    },
    {
      id: 9,
      name: "Footwear",
      color: "#00008B",
      image: require("../assets/footwear.jpeg"),
      products: [
        { id: 0, name: "Slipper", image: require("../assets/slipper.jpeg") },
        { id: 1, name: "Shoe", image: require("../assets/shoe.webp") },]
    },
    {
      id: 10,
      name: "Personal Care",
      color: "#00008B",
      image: require("../assets/personalcare.png"),
      products: [
        { id: 0, name: "Tissues", image: require("../assets/temper.jpeg") },
        { id: 1, name: "Handwash" , image: require("../assets/handwash.webp")},]
    },
    {
      id: 11,
      name: "Jewellery",
      color: "#00008B",
      image: require("../assets/jewels.webp"),
      products: [
        { id: 0, name: "Chain", image: require("../assets/chain.jpeg") },
        { id: 1, name: "Ring", image: require("../assets/ring.webp") },]
    },
  ];

  const CategoryScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const handleBackPress = () => {
      navigation.navigate("HomeScreen");
    };
  
    const handleCategoryPress = (categoryId) => {
      console.log(`Category ${categoryId} pressed`);
      setSelectedCategory(categoryId);
    };
  
    const handleProductPress = (productId) => {
      console.log(`Product ${productId} pressed`);
    };
  
    const renderProductItem = ({ item }) => (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => handleProductPress(item.id)}
      >
        <Image
          source={item.image}
          style={styles.productItemImage}
          resizeMode="cover"
        />
        <Text style={styles.productItemTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  
    const renderCategoryItem = ({ item }) => (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.categoryItem,
          selectedCategory === item.id && styles.selectedCategoryItem,
        ]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <Image
          source={item.image}
          style={styles.categoryItemImage}
          resizeMode="cover"
        />
        <Text style={styles.categoryItemTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="arrow-back" type="material" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Categories</Text>
        </View>
        <View style={styles.mainContent}>
          {/* Sidebar with Categories */}
          <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map((category) => renderCategoryItem({ item: category }))}
          </ScrollView>
          </View>
  
          {/* Main Area with Product List */}
          <ScrollView style={styles.mainArea}>
            {selectedCategory === null
              ? categories.map((category) => (
                  <View key={category.id}>
                    <Text style={styles.categoryHeading}>{category.name}</Text>
                    <FlatList
                      data={category.products}
                      renderItem={renderProductItem}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                ))
              : selectedCategory !== null && (
                  <View key={selectedCategory}>
                    <Text style={styles.categoryHeading}>
                      {categories[selectedCategory].name}
                    </Text>
                    <FlatList
                      data={categories[selectedCategory].products}
                      renderItem={renderProductItem}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                )}
          </ScrollView>
        </View>
      </View>
    );
  };  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      marginTop: 20,
      fontSize: 16,
    },
    headerText: {
      fontSize: 18,
      marginLeft: 10,
    },
    mainContent: {
      // flex: 1,
      flexDirection: "row",
      justifyContent:"space-between"
    },
    sidebar: {
      flexDirection: "column",
      padding: 10,
      width: 100,
      backgroundColor: "#fff",
      borderRadius: 5, 
      elevation: 5, 
      shadowColor: "#ccc", 
      shadowOffset: {
        width: 2,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    
  categoryItem: {
    marginBottom: 20,
  },
  categoryItemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  categoryItemTitle: {
      textAlign: "center",
    },
    mainArea: {
      flex: 1,
      marginTop: 20,
      paddingLeft:20
    },
    categoryHeading: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    productItem: {
      marginRight: 10,
      padding:10
    },
    productItemImage: {
      width: 110,
      height: 110,
      borderRadius: 5,
      marginBottom: 5,
    },
    productItemTitle: {
      textAlign: "center",
    },
    selectedCategoryItem: {
      // backgroundColor: "#ddd",
      padding:0,
      margin:0 // Change the background color for the selected category
    },
  });
  
  export default CategoryScreen;
  
  
  

  
  
  
