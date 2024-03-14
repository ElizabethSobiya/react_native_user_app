import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DeliveryScreen from './src/components/DeliveryScreen';
import LocationSelectionScreen from './src/components/LocationSelectionScreen';
import HomeScreen from './src/components/HomeScreen';
import AccountScreen from './src/components/AccountScreen';
import ProductDetails from './src/components/ProductDetailsScreen';
import Cart from './src/components/CartScreen';
import CategoryScreen from './src/components/CategoryScreen';
import LoginScreen from './src/components/LoginScreen';


const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="vivimart"
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="vivimart"
          component={DeliveryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationSelectionScreen"
          component={LocationSelectionScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ title: '' }}
        />
         <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: '' }}
        />
         <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ title: '' }}
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

export default App;
