import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from '../screens/MainScreen';
import LocationSelectionScreen from '../components/LocationSelectionScreen';
import HomeScreen from '../components/HomeScreen';
import AccountScreen from '../components/AccountScreen';
import ProductDetails from '../components/ProductDetailsScreen';
import Cart from '../components/CartScreen';
import CategoryScreen from '../components/CategoryScreen';
import LoginScreen from '../components/LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center', 
        headerShown: false, 
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="LocationSelectionScreen"
        component={LocationSelectionScreen}
        options={{ headerShown: false }} // Set an empty title to hide the header title
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }} // Set an empty title to hide the header title
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }} 
      />
       <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ headerShown: false }} 
        />
         <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
    </Stack.Navigator>
  </NavigationContainer>
  
  );
};

export default AppNavigator;
