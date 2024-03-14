import React from 'react';
import { View } from 'react-native';
import { DeliveryScreen, LocationSelectionScreen, HomeScreen, AccountScreen } from '../components/index';

const MainScreen = ({ navigation }) => {
  return (
    <View>
      <DeliveryScreen navigation={navigation} />
      <LocationSelectionScreen navigation={navigation} />
      <HomeScreen navigation={navigation} />
      <AccountScreen navigation={navigation} />
    </View>
  );
}

export default MainScreen;
